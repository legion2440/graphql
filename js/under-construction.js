const TOOLTIP_TEXT = "Under construction";
const PLACEHOLDER_SELECTOR = "[data-placeholder]";

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

function positionTooltip(tooltip, target) {
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
}

export function initUnderConstruction(root = document.body) {
  const tooltip = createTooltip(document.body);
  let activeTarget = null;
  let touchPinned = false;

  const show = (target, pinned = false) => {
    activeTarget = target;
    touchPinned = pinned;
    positionTooltip(tooltip, target);
  };

  const hide = () => {
    activeTarget = null;
    touchPinned = false;
    tooltip.hidden = true;
  };

  root.querySelectorAll(PLACEHOLDER_SELECTOR).forEach((element) => {
    if (!element.hasAttribute("aria-label")) {
      element.setAttribute("aria-label", "Under construction. Placeholder data.");
    }
    if (!element.hasAttribute("tabindex")) {
      element.setAttribute("tabindex", "0");
    }
  });

  root.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    const target = event.target.closest?.(PLACEHOLDER_SELECTOR);
    if (target && root.contains(target)) {
      show(target);
    }
  });

  root.addEventListener("pointerout", (event) => {
    if (event.pointerType === "touch" || touchPinned) {
      return;
    }

    const target = event.target.closest?.(PLACEHOLDER_SELECTOR);
    if (!target || !activeTarget || target !== activeTarget) {
      return;
    }

    const related = event.relatedTarget;
    if (!related || !target.contains(related)) {
      hide();
    }
  });

  root.addEventListener("focusin", (event) => {
    const target = event.target.closest?.(PLACEHOLDER_SELECTOR);
    if (target && root.contains(target)) {
      show(target);
    }
  });

  root.addEventListener("focusout", (event) => {
    if (touchPinned) {
      return;
    }

    const target = event.target.closest?.(PLACEHOLDER_SELECTOR);
    const related = event.relatedTarget;
    if (target && (!related || !target.contains(related))) {
      hide();
    }
  });

  root.addEventListener("click", (event) => {
    const target = event.target.closest?.(PLACEHOLDER_SELECTOR);

    if (!target || !root.contains(target)) {
      hide();
      return;
    }

    if (activeTarget === target && touchPinned) {
      hide();
      return;
    }

    show(target, true);
  });

  document.addEventListener("click", (event) => {
    const target = event.target.closest?.(PLACEHOLDER_SELECTOR);
    if (!target && activeTarget) {
      hide();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hide();
    }
  });

  window.addEventListener("resize", () => {
    if (activeTarget) {
      positionTooltip(tooltip, activeTarget);
    }
  });

  return { hide };
}
