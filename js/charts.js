const SVG_NS = "http://www.w3.org/2000/svg";

function createSvgElement(name, attributes = {}, text = "") {
  const element = document.createElementNS(SVG_NS, name);

  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, String(value));
  }

  if (text !== "") {
    element.textContent = text;
  }

  return element;
}

function appendTitle(element, text) {
  element.append(createSvgElement("title", {}, text));
}

function renderEmptyState(container, message) {
  const emptyState = document.createElement("p");
  emptyState.className = "chart-empty";
  emptyState.textContent = message;
  container.replaceChildren(emptyState);
}

function safeRange(minimum, maximum) {
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) {
    return { minimum: 0, maximum: 1 };
  }

  if (minimum === maximum) {
    const padding = Math.max(1, Math.abs(minimum) * 0.1);
    return {
      minimum: minimum - padding,
      maximum: maximum + padding,
    };
  }

  return { minimum, maximum };
}

function formatCompactNumber(value) {
  return new Intl.NumberFormat(undefined, {
    notation: Math.abs(value) >= 10000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatExactNumber(value) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function getLineXPositions(entries, left, plotWidth) {
  const times = entries.map(({ transaction }) => transaction.date?.getTime());
  const allDatesValid = times.every(Number.isFinite);
  const minimum = allDatesValid ? Math.min(...times) : 0;
  const maximum = allDatesValid ? Math.max(...times) : 0;

  if (allDatesValid && maximum > minimum) {
    return times.map((time) => left + ((time - minimum) / (maximum - minimum)) * plotWidth);
  }

  if (entries.length === 1) {
    return [left + plotWidth / 2];
  }

  return entries.map((_, index) => left + (index / (entries.length - 1)) * plotWidth);
}

export function renderCumulativeXpChart(container, entries, getProjectName) {
  container.replaceChildren();

  if (!Array.isArray(entries) || entries.length === 0) {
    renderEmptyState(container, "No XP transactions are available.");
    return;
  }

  const width = 800;
  const height = 360;
  const margin = { top: 28, right: 28, bottom: 54, left: 72 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const values = entries.map((entry) => entry.cumulative);
  const domain = safeRange(Math.min(0, ...values), Math.max(0, ...values));
  const yScale = (value) =>
    margin.top +
    plotHeight -
    ((value - domain.minimum) / (domain.maximum - domain.minimum)) * plotHeight;
  const xPositions = getLineXPositions(entries, margin.left, plotWidth);
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    role: "img",
    "aria-label": "Cumulative XP over time line chart",
    preserveAspectRatio: "xMidYMid meet",
  });

  appendTitle(svg, "Cumulative XP over time");

  const tickCount = 4;

  for (let index = 0; index <= tickCount; index += 1) {
    const ratio = index / tickCount;
    const value = domain.maximum - ratio * (domain.maximum - domain.minimum);
    const y = margin.top + ratio * plotHeight;

    svg.append(
      createSvgElement("line", {
        x1: margin.left,
        y1: y,
        x2: width - margin.right,
        y2: y,
        class: "chart-grid-line",
      }),
      createSvgElement(
        "text",
        {
          x: margin.left - 10,
          y: y + 4,
          class: "chart-label",
          "text-anchor": "end",
        },
        formatCompactNumber(value),
      ),
    );
  }

  svg.append(
    createSvgElement("line", {
      x1: margin.left,
      y1: margin.top,
      x2: margin.left,
      y2: height - margin.bottom,
      class: "chart-axis",
    }),
    createSvgElement("line", {
      x1: margin.left,
      y1: height - margin.bottom,
      x2: width - margin.right,
      y2: height - margin.bottom,
      class: "chart-axis",
    }),
  );

  const firstDate = entries[0].transaction.date;
  const lastDate = entries.at(-1).transaction.date;
  svg.append(
    createSvgElement(
      "text",
      {
        x: margin.left,
        y: height - 20,
        class: "chart-label",
        "text-anchor": "start",
      },
      formatDate(firstDate),
    ),
    createSvgElement(
      "text",
      {
        x: width - margin.right,
        y: height - 20,
        class: "chart-label",
        "text-anchor": "end",
      },
      formatDate(lastDate),
    ),
  );

  const points = entries.map((entry, index) => ({
    ...entry,
    x: xPositions[index],
    y: yScale(entry.cumulative),
  }));
  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  svg.append(createSvgElement("path", { d: pathData, class: "chart-line" }));

  for (const point of points) {
    const circle = createSvgElement("circle", {
      cx: point.x,
      cy: point.y,
      r: 5,
      class: "chart-point",
      tabindex: 0,
    });
    const projectName = getProjectName(point.transaction);
    appendTitle(
      circle,
      [
        formatDate(point.transaction.date),
        projectName,
        `Transaction: ${formatExactNumber(point.transaction.amount)} XP`,
        `Cumulative: ${formatExactNumber(point.cumulative)} XP`,
      ].join(" — "),
    );
    svg.append(circle);
  }

  container.append(svg);
}

function truncateLabel(label, maximumLength = 16) {
  return label.length > maximumLength
    ? `${label.slice(0, maximumLength - 1)}…`
    : label;
}

export function renderXpByProjectChart(container, projects) {
  container.replaceChildren();

  if (!Array.isArray(projects) || projects.length === 0) {
    renderEmptyState(container, "No project XP data is available.");
    return;
  }

  const height = 400;
  const margin = { top: 38, right: 24, bottom: 110, left: 56 };
  const slotWidth = 88;
  const width = Math.max(620, margin.left + margin.right + projects.length * slotWidth);
  const plotHeight = height - margin.top - margin.bottom;
  const maximumXp = Math.max(0, ...projects.map((project) => project.xp));
  const scaleMaximum = maximumXp > 0 ? maximumXp : 1;
  const baseline = height - margin.bottom;
  const barWidth = Math.min(54, slotWidth * 0.62);
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width,
    role: "img",
    "aria-label": "XP by project bar chart",
    preserveAspectRatio: "xMinYMid meet",
  });

  appendTitle(svg, "XP by project");

  for (let index = 0; index <= 4; index += 1) {
    const ratio = index / 4;
    const value = scaleMaximum * (1 - ratio);
    const y = margin.top + ratio * plotHeight;

    svg.append(
      createSvgElement("line", {
        x1: margin.left,
        y1: y,
        x2: width - margin.right,
        y2: y,
        class: "chart-grid-line",
      }),
      createSvgElement(
        "text",
        {
          x: margin.left - 9,
          y: y + 4,
          class: "chart-label",
          "text-anchor": "end",
        },
        formatCompactNumber(value),
      ),
    );
  }

  svg.append(
    createSvgElement("line", {
      x1: margin.left,
      y1: baseline,
      x2: width - margin.right,
      y2: baseline,
      class: "chart-axis",
    }),
  );

  projects.forEach((project, index) => {
    const centerX = margin.left + index * slotWidth + slotWidth / 2;
    const safeXp = Math.max(0, project.xp);
    const barHeight = Math.max(0, (safeXp / scaleMaximum) * plotHeight);
    const bar = createSvgElement("rect", {
      x: centerX - barWidth / 2,
      y: baseline - barHeight,
      width: barWidth,
      height: barHeight,
      rx: 5,
      class: "chart-bar",
      tabindex: 0,
    });

    appendTitle(bar, `${project.name} — ${formatExactNumber(project.xp)} XP`);

    svg.append(
      bar,
      createSvgElement(
        "text",
        {
          x: centerX,
          y: Math.max(margin.top + 12, baseline - barHeight - 8),
          class: "chart-value",
          "text-anchor": "middle",
        },
        formatCompactNumber(project.xp),
      ),
      createSvgElement(
        "text",
        {
          x: centerX - 4,
          y: baseline + 18,
          class: "chart-label",
          "text-anchor": "end",
          transform: `rotate(-45 ${centerX - 4} ${baseline + 18})`,
        },
        truncateLabel(project.name),
      ),
    );
  });

  container.append(svg);
}
