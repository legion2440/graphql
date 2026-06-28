const TOOLTIP_TEXT = "Under construction";
const PLACEHOLDER_SELECTOR = "[data-placeholder]";
const SNAPSHOT_SELECTOR = '[data-provenance="snapshot"]';
const INTERACTIVE_SELECTOR = "button, input, select, textarea, a, label, [role='button'], [role='tab']";

function createTooltip(root) {
  const tooltip = document.createElement("div");
  tooltip.className = "uc-tooltip";
  tooltip.textContent = TOOLTIP_TEXT;
  tooltip.hidden = true;
  root.append(tooltip);
  return tooltip;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isHidden(target) {
  return !target.isConnected || target.closest("[hidden]") || target.getClientRects().length === 0;
}

function positionTooltip(tooltip, target) {
  if (isHidden(target)) {
    tooltip.hidden = true;
    return false;
  }

  const targetRect = target.getBoundingClientRect();
  tooltip.hidden = false;
  const tooltipRect = tooltip.getBoundingClientRect();
  const gap = 8;
  const left = clamp(
    targetRect.left + targetRect.width / 2 - tooltipRect.width / 2,
    14,
    window.innerWidth - tooltipRect.width - 14,
  );
  const preferredTop = targetRect.top - tooltipRect.height - gap;
  const top =
    preferredTop >= 14
      ? preferredTop
      : clamp(targetRect.bottom + gap, 14, window.innerHeight - tooltipRect.height - 14);

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  return true;
}

function getPlaceholderTarget(event, root) {
  const target = event.target.closest?.(PLACEHOLDER_SELECTOR);
  return target && root.contains(target) ? target : null;
}

function getSnapshotTarget(event, root) {
  const target = event.target.closest?.(SNAPSHOT_SELECTOR);
  return target && root.contains(target) ? target : null;
}

function getTooltipTarget(event, root) {
  const placeholderTarget = getPlaceholderTarget(event, root);
  const snapshotTarget = getSnapshotTarget(event, root);
  if (!placeholderTarget) {
    return snapshotTarget;
  }
  if (!snapshotTarget) {
    return placeholderTarget;
  }

  return placeholderTarget.contains(snapshotTarget) && placeholderTarget !== snapshotTarget
    ? snapshotTarget
    : placeholderTarget;
}

function getSnapshotContext(target) {
  return target?.closest?.(SNAPSHOT_SELECTOR) ?? null;
}

function getTooltipText(target) {
  const isPlaceholder = target?.matches?.(PLACEHOLDER_SELECTOR);
  const snapshotTarget = getSnapshotContext(target);
  const snapshotText =
    snapshotTarget?.dataset?.provenance === "snapshot" && snapshotTarget.dataset.snapshotDate
      ? `snapshot от ${snapshotTarget.dataset.snapshotDate}`
      : "";

  if (isPlaceholder && snapshotText) {
    return `${TOOLTIP_TEXT} (${snapshotText})`;
  }
  if (isPlaceholder) {
    return TOOLTIP_TEXT;
  }
  return snapshotText || TOOLTIP_TEXT;
}

function syncAriaLabel(target) {
  if (target) {
    target.setAttribute("aria-label", getTooltipText(target));
  }
}

function isInteractiveInsideTooltipTarget(event, target) {
  const interactive = event.target.closest?.(INTERACTIVE_SELECTOR);
  return Boolean(interactive && target?.contains(interactive) && interactive !== target);
}

export function initUnderConstruction(root = document.querySelector(".ts-root") ?? document.body) {
  const tooltipRoot = root.closest?.(".ts-root") ?? root;
  const tooltip = createTooltip(tooltipRoot);
  let activeTarget = null;
  let pinnedPointerType = null;

  const show = (target, pointerType = null) => {
    activeTarget = target;
    pinnedPointerType = pointerType;
    syncAriaLabel(target);
    tooltip.textContent = getTooltipText(target);
    if (!positionTooltip(tooltip, target)) {
      activeTarget = null;
      pinnedPointerType = null;
    }
  };

  const hide = () => {
    activeTarget = null;
    pinnedPointerType = null;
    tooltip.hidden = true;
  };

  const reposition = () => {
    if (!activeTarget) {
      return;
    }

    if (!positionTooltip(tooltip, activeTarget)) {
      hide();
    }
  };

  root.querySelectorAll(`${PLACEHOLDER_SELECTOR}, ${SNAPSHOT_SELECTOR}`).forEach((element) => {
    syncAriaLabel(element);
    if (!element.hasAttribute("tabindex")) {
      element.setAttribute("tabindex", "0");
    }
  });

  root.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      return;
    }

    const target = getTooltipTarget(event, root);
    if (target && !isInteractiveInsideTooltipTarget(event, target)) {
      show(target);
    }
  });

  root.addEventListener("pointerout", (event) => {
    if (event.pointerType === "touch" || event.pointerType === "pen" || pinnedPointerType) {
      return;
    }

    const target = getTooltipTarget(event, root);
    if (!target || !activeTarget || target !== activeTarget) {
      return;
    }

    const related = event.relatedTarget;
    if (!related || !target.contains(related)) {
      hide();
    }
  });

  root.addEventListener("focusin", (event) => {
    const target = getTooltipTarget(event, root);
    if (target && !isInteractiveInsideTooltipTarget(event, target)) {
      show(target);
    }
  });

  root.addEventListener("click", (event) => {
    const target = getTooltipTarget(event, root);
    if (target && !isInteractiveInsideTooltipTarget(event, target)) {
      show(target);
    }
  });

  root.addEventListener("focusout", (event) => {
    if (pinnedPointerType) {
      return;
    }

    const target = getTooltipTarget(event, root);
    const related = event.relatedTarget;
    if (target && (!related || !target.contains(related))) {
      hide();
    }
  });

  root.addEventListener("pointerup", (event) => {
    const target = getTooltipTarget(event, root);

    if (!target || isInteractiveInsideTooltipTarget(event, target)) {
      return;
    }

    if (event.pointerType === "mouse") {
      return;
    }

    event.preventDefault();
    if (activeTarget === target && pinnedPointerType) {
      hide();
      return;
    }

    show(target, event.pointerType);
  });

  document.addEventListener("pointerup", (event) => {
    if (!activeTarget || (event.pointerType === "mouse" && !pinnedPointerType)) {
      return;
    }

    const target = getTooltipTarget(event, root);
    if (target !== activeTarget) {
      hide();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hide();
    }
  });

  document.addEventListener("under-construction-hide", hide);
  window.addEventListener("resize", reposition);
  window.addEventListener("scroll", reposition, true);

  return { hide };
}
