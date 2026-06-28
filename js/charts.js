import { formatCompactNumber, formatDate, formatExactNumber, formatNumber, formatXp } from "./data.js";

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

function formatExactXp(value) {
  return `${formatExactNumber(value)} XP`;
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

function safeCoordinate(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
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

  return entries.map((_, index) => left + (index / Math.max(1, entries.length - 1)) * plotWidth);
}

function truncateLabel(label, maximumLength = 24) {
  return label.length > maximumLength ? `${label.slice(0, maximumLength - 1)}…` : label;
}

function appendLinearGradient(svg, id, stops, attrs = {}) {
  const defs = svg.querySelector("defs") || createSvgElement("defs");

  if (!defs.parentNode) {
    svg.append(defs);
  }

  const gradient = createSvgElement("linearGradient", {
    id,
    x1: attrs.x1 ?? "0",
    y1: attrs.y1 ?? "0",
    x2: attrs.x2 ?? "1",
    y2: attrs.y2 ?? "0",
  });

  for (const stop of stops) {
    gradient.append(
      createSvgElement("stop", {
        offset: stop.offset,
        "stop-color": stop.color,
        "stop-opacity": stop.opacity ?? 1,
      }),
    );
  }

  defs.append(gradient);
}

export function renderCumulativeXpChart(container, entries, getProjectName) {
  container.replaceChildren();

  if (!Array.isArray(entries) || entries.length === 0) {
    renderEmptyState(container, "No XP transactions are available.");
    return;
  }

  const width = 860;
  const height = 300;
  const margin = { top: 22, right: 18, bottom: 40, left: 52 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const values = entries.map((entry) => entry.cumulative).filter(Number.isFinite);
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
  appendLinearGradient(
    svg,
    "cumulative-area-gradient",
    [
      { offset: "0%", color: "var(--blue)", opacity: 0.32 },
      { offset: "100%", color: "var(--blue)", opacity: 0 },
    ],
    { x1: 0, y1: 0, x2: 0, y2: 1 },
  );

  for (let index = 0; index <= 4; index += 1) {
    const ratio = index / 4;
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
        y: height - 12,
        class: "chart-label",
        "text-anchor": "start",
      },
      formatDate(firstDate),
    ),
    createSvgElement(
      "text",
      {
        x: width - margin.right,
        y: height - 12,
        class: "chart-label",
        "text-anchor": "end",
      },
      formatDate(lastDate),
    ),
  );

  const points = entries.map((entry, index) => ({
    ...entry,
    x: safeCoordinate(xPositions[index], margin.left),
    y: safeCoordinate(yScale(entry.cumulative), margin.top + plotHeight),
  }));
  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(" ");
  const baseline = margin.top + plotHeight;
  const areaData =
    points.length === 1
      ? `M ${points[0].x.toFixed(1)} ${baseline.toFixed(1)} L ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} L ${points[0].x.toFixed(1)} ${baseline.toFixed(1)} Z`
      : `${pathData} L ${points.at(-1).x.toFixed(1)} ${baseline.toFixed(1)} L ${points[0].x.toFixed(1)} ${baseline.toFixed(1)} Z`;

  svg.append(
    createSvgElement("path", {
      d: areaData,
      class: "chart-area",
      fill: "url(#cumulative-area-gradient)",
    }),
    createSvgElement("path", { d: pathData, class: "chart-line" }),
  );

  const lastPoint = points.at(-1);
  svg.append(
    createSvgElement("circle", {
      cx: lastPoint.x,
      cy: lastPoint.y,
      r: 9,
      class: "chart-halo",
    }),
  );

  for (const point of points) {
    const circle = createSvgElement("circle", {
      cx: point.x,
      cy: point.y,
      r: point === lastPoint ? 5 : 3,
      class: "chart-point",
      tabindex: 0,
    });
    const projectName = getProjectName(point.transaction);
    appendTitle(
      circle,
      [
        formatDate(point.transaction.date),
        projectName,
        `Transaction: ${formatExactXp(point.transaction.amount)}`,
        `Cumulative: ${formatExactXp(point.cumulative)}`,
      ].join(" — "),
    );
    svg.append(circle);
  }

  container.append(svg);
}

export function renderXpByProjectChart(container, projects) {
  container.replaceChildren();

  if (!Array.isArray(projects) || projects.length === 0) {
    renderEmptyState(container, "No project XP data is available.");
    return;
  }

  const width = 860;
  const rowHeight = 38;
  const margin = { top: 12, right: 80, bottom: 18, left: 150 };
  const height = Math.max(180, margin.top + margin.bottom + projects.length * rowHeight);
  const barX = margin.left + 14;
  const barWidth = width - barX - margin.right;
  const maxXp = Math.max(1, ...projects.map((project) => Math.max(0, project.xp)));
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    role: "img",
    "aria-label": "XP by project horizontal bar chart",
    preserveAspectRatio: "xMinYMin meet",
  });

  appendTitle(svg, "XP by project");
  appendLinearGradient(svg, "project-bar-gradient", [
    { offset: "0%", color: "var(--blue)" },
    { offset: "100%", color: "var(--cyan)" },
  ]);

  projects.forEach((project, index) => {
    const y = margin.top + index * rowHeight;
    const centerY = y + 18;
    const safeXp = Math.max(0, Number.isFinite(project.xp) ? project.xp : 0);
    const fillWidth = Math.max(0, Math.min(barWidth, (safeXp / maxXp) * barWidth));
    const group = createSvgElement("g", { tabindex: 0 });

    appendTitle(group, `${project.name} — ${formatExactXp(project.xp)} · ${project.transactions} XP transactions`);
    group.append(
      createSvgElement(
        "text",
        {
          x: margin.left,
          y: centerY + 4,
          class: "chart-label",
          "text-anchor": "end",
        },
        truncateLabel(project.name),
      ),
      createSvgElement("rect", {
        x: barX,
        y: y + 11,
        width: barWidth,
        height: 13,
        rx: 7,
        class: "project-bar-track",
      }),
      createSvgElement("rect", {
        x: barX,
        y: y + 11,
        width: fillWidth,
        height: 13,
        rx: 7,
        class: "project-bar-fill ts-fill",
        fill: "url(#project-bar-gradient)",
      }),
      createSvgElement(
        "text",
        {
          x: width - 16,
          y: centerY + 4,
          class: "chart-value",
          "text-anchor": "end",
        },
        formatExactNumber(project.xp),
      ),
    );
    svg.append(group);
  });

  container.append(svg);
}

export function renderActivityHeatmap(container, heatmap) {
  container.replaceChildren();

  if (!heatmap || !Array.isArray(heatmap.cells)) {
    renderEmptyState(container, "No XP activity data is available.");
    return;
  }

  const monthRow = document.createElement("div");
  monthRow.className = "heatmap-months";
  monthRow.style.width = `${heatmap.weeks * 20}px`;

  for (const month of heatmap.months) {
    const label = document.createElement("span");
    label.textContent = month.label;
    label.style.left = `${month.week * 20}px`;
    monthRow.append(label);
  }

  const body = document.createElement("div");
  body.className = "heatmap-body";

  const dayLabels = document.createElement("div");
  dayLabels.className = "heatmap-days";

  for (const label of ["Пн", "", "Ср", "", "Пт", "", ""]) {
    const item = document.createElement("span");
    item.textContent = label;
    dayLabels.append(item);
  }

  const grid = document.createElement("div");
  grid.className = "heatmap-grid";
  grid.style.gridAutoColumns = "15px";

  for (const cell of heatmap.cells) {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "heatmap-cell";
    item.setAttribute("data-level", String(cell.level));
    item.setAttribute("aria-label", `${formatDate(cell.date)}: ${formatExactXp(cell.xp)}`);
    item.title = `${formatDate(cell.date)} — ${formatExactXp(cell.xp)}`;
    grid.append(item);
  }

  body.append(dayLabels, grid);

  const legend = document.createElement("div");
  legend.className = "heatmap-legend";
  const less = document.createElement("span");
  less.textContent = "меньше";
  const more = document.createElement("span");
  more.textContent = "больше";
  legend.append(less);

  for (let level = 0; level <= 4; level += 1) {
    const swatch = document.createElement("i");
    swatch.className = "heatmap-cell";
    swatch.setAttribute("data-level", String(level));
    legend.append(swatch);
  }

  legend.append(more);
  container.append(monthRow, body, legend);
}

export function renderAuditRadial(container, totalUp, totalDown) {
  container.replaceChildren();

  const width = 200;
  const height = 200;
  const cx = 100;
  const cy = 100;
  const r = 74;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * r;
  const up = Math.max(0, Number.isFinite(totalUp) ? totalUp : 0);
  const down = Math.max(0, Number.isFinite(totalDown) ? totalDown : 0);
  const sum = up + down;
  const upFraction = sum > 0 ? up / sum : 0;
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width,
    height,
    role: "img",
    "aria-label": "Audit ratio radial chart",
  });

  appendTitle(svg, `Audit totals: done ${formatXp(up)}, received ${formatXp(down)}`);
  svg.append(
    createSvgElement("circle", {
      cx,
      cy,
      r,
      fill: "none",
      stroke: "var(--cyan)",
      "stroke-width": strokeWidth,
      opacity: 0.55,
    }),
    createSvgElement("circle", {
      cx,
      cy,
      r,
      fill: "none",
      stroke: "var(--blue)",
      "stroke-width": strokeWidth,
      "stroke-linecap": "round",
      "stroke-dasharray": `${(circumference * upFraction).toFixed(1)} ${circumference.toFixed(1)}`,
      transform: `rotate(-90 ${cx} ${cy})`,
      style: "filter: drop-shadow(0 0 8px var(--blue-a))",
    }),
  );

  container.append(svg);
}

export function renderRadarChart(container, axes, title = "Skills radar chart") {
  container.replaceChildren();

  if (!Array.isArray(axes) || axes.length < 3) {
    renderEmptyState(container, "No radar data is available.");
    return;
  }

  const cx = 150;
  const cy = 145;
  const radius = 102;
  const width = 300;
  const height = 290;
  const count = axes.length;
  const point = (index, factor) => {
    const angle = (-90 + (index * 360) / count) * (Math.PI / 180);
    return [cx + radius * factor * Math.cos(angle), cy + radius * factor * Math.sin(angle)];
  };
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    role: "img",
    "aria-label": title,
    preserveAspectRatio: "xMidYMid meet",
  });

  appendTitle(svg, title);

  for (const factor of [0.25, 0.5, 0.75, 1]) {
    const points = axes.map((_, index) => point(index, factor));
    const d = `M${points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L")} Z`;
    svg.append(createSvgElement("path", { d, fill: "none", stroke: "var(--grid)", "stroke-width": 1 }));
  }

  axes.forEach((_, index) => {
    const [x, y] = point(index, 1);
    svg.append(createSvgElement("line", { x1: cx, y1: cy, x2: x, y2: y, stroke: "var(--grid)", "stroke-width": 1 }));
  });

  const dataPoints = axes.map((axis, index) => point(index, Math.max(0, Math.min(100, axis.value)) / 100));
  const dataPath = `M${dataPoints.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L")} Z`;
  svg.append(
    createSvgElement("path", {
      d: dataPath,
      fill: "var(--lime-a)",
      stroke: "var(--lime)",
      "stroke-width": 2,
      style: "filter: drop-shadow(0 0 8px var(--lime-a))",
    }),
  );

  dataPoints.forEach(([x, y], index) => {
    const dot = createSvgElement("circle", { cx: x, cy: y, r: 3.5, fill: "var(--lime)" });
    appendTitle(dot, `${axes[index].label}: ${formatNumber(axes[index].value)}`);
    svg.append(dot);
  });

  axes.forEach((axis, index) => {
    const [x, y] = point(index, 1.2);
    svg.append(
      createSvgElement(
        "text",
        {
          x,
          y: y + 4,
          class: "chart-label",
          "text-anchor": "middle",
        },
        axis.label,
      ),
    );
  });

  container.append(svg);
}

export function renderCompareChart(container, data = null) {
  const months = Array.isArray(data?.months) ? data.months : [];
  const you = Array.isArray(data?.you) ? data.you : [];
  const cohort = Array.isArray(data?.cohort) ? data.cohort : [];

  if (months.length === 0 || you.length === 0 || cohort.length === 0) {
    renderEmptyState(container, "No confirmed historical cohort data is available.");
    return;
  }

  renderDualLineChart(container, you, cohort, months, data.title);
}

function renderDualLineChart(container, you, cohort, months, title = "You versus snapshot cohort comparison") {
  container.replaceChildren();
  const width = 860;
  const height = 320;
  const margin = { left: 52, right: 18, top: 24, bottom: 40 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const max = Math.max(1, ...you, ...cohort);
  const xScale = (index) => margin.left + (plotWidth * index) / Math.max(1, you.length - 1);
  const yScale = (value) => margin.top + plotHeight * (1 - value / max);
  const linePath = (values) =>
    values.map((value, index) => `${index === 0 ? "M" : "L"} ${xScale(index).toFixed(1)} ${yScale(value).toFixed(1)}`).join(" ");
  const youLine = linePath(you);
  const cohortLine = linePath(cohort);
  const area = `${youLine} L ${xScale(you.length - 1).toFixed(1)} ${margin.top + plotHeight} L ${margin.left} ${margin.top + plotHeight} Z`;
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    role: "img",
    "aria-label": title,
  });

  appendTitle(svg, title);
  appendLinearGradient(
    svg,
    "compare-area-gradient",
    [
      { offset: "0%", color: "var(--blue)", opacity: 0.28 },
      { offset: "100%", color: "var(--blue)", opacity: 0 },
    ],
    { x1: 0, y1: 0, x2: 0, y2: 1 },
  );

  for (let index = 0; index <= 4; index += 1) {
    const ratio = index / 4;
    const y = margin.top + plotHeight * (1 - ratio);
    svg.append(
      createSvgElement("line", { x1: margin.left, x2: width - margin.right, y1: y, y2: y, class: "chart-grid-line" }),
      createSvgElement(
        "text",
        { x: margin.left - 10, y: y + 4, class: "chart-label", "text-anchor": "end" },
        `${formatExactNumber(max * ratio)} XP`,
      ),
    );
  }

  months.forEach((month, index) => {
    if (index % 2 === 0) {
      svg.append(
        createSvgElement(
          "text",
          { x: xScale(index), y: height - 12, class: "chart-label", "text-anchor": "middle" },
          month,
        ),
      );
    }
  });

  svg.append(
    createSvgElement("path", { d: area, fill: "url(#compare-area-gradient)" }),
    createSvgElement("path", {
      d: cohortLine,
      fill: "none",
      stroke: "var(--muted)",
      "stroke-width": 2,
      "stroke-dasharray": "5 5",
      "stroke-linejoin": "round",
    }),
    createSvgElement("path", { d: youLine, class: "chart-line" }),
    createSvgElement("circle", { cx: xScale(you.length - 1), cy: yScale(you.at(-1)), r: 5, class: "chart-point" }),
    createSvgElement("circle", {
      cx: xScale(cohort.length - 1),
      cy: yScale(cohort.at(-1)),
      r: 4,
      fill: "var(--card)",
      stroke: "var(--muted)",
      "stroke-width": 2,
    }),
  );

  container.append(svg);
}

export function renderDistributionHistogram(container, count = 50, pop = "all", snapshot = {}) {
  container.replaceChildren();

  const values = Array.isArray(snapshot.values) ? snapshot.values.filter(Number.isFinite) : [];
  if (values.length === 0) {
    renderEmptyState(container, "No leaderboard snapshot XP data is available.");
    return;
  }

  const bins = generateSnapshotBins(values, count);
  const width = 860;
  const height = 300;
  const margin = { left: 50, right: 14, top: 16, bottom: 40 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const max = Math.max(1, ...bins);
  const barWidth = plotWidth / bins.length;
  const domainMax = Math.max(1, ...values);
  const markerValue = Number.isFinite(snapshot.markerValue) ? snapshot.markerValue : null;
  const hasMarker = markerValue !== null;
  const yourIndex = hasMarker
    ? Math.min(bins.length - 1, Math.max(0, Math.floor((markerValue / domainMax) * bins.length)))
    : -1;
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    role: "img",
    "aria-label": "XP distribution histogram from snapshot data",
  });

  appendTitle(svg, "Student XP distribution snapshot");

  for (let index = 0; index <= 4; index += 1) {
    const ratio = index / 4;
    const y = margin.top + plotHeight * (1 - ratio);
    svg.append(
      createSvgElement("line", { x1: margin.left, x2: width - margin.right, y1: y, y2: y, class: "chart-grid-line" }),
      createSvgElement(
        "text",
        { x: margin.left - 9, y: y + 4, class: "chart-label", "text-anchor": "end" },
        String(Math.round(max * ratio)),
      ),
    );
  }

  svg.append(
    createSvgElement("line", { x1: margin.left, x2: margin.left, y1: margin.top, y2: margin.top + plotHeight, class: "chart-axis" }),
    createSvgElement("line", {
      x1: margin.left,
      x2: width - margin.right,
      y1: margin.top + plotHeight,
      y2: margin.top + plotHeight,
      class: "chart-axis",
    }),
  );
  svg.append(
    createSvgElement(
      "text",
      {
        x: 18,
        y: margin.top + plotHeight / 2,
        class: "chart-label histogram-y-title",
        "text-anchor": "middle",
        transform: `rotate(-90 18 ${margin.top + plotHeight / 2})`,
      },
      "студентов",
    ),
  );

  bins.forEach((value, index) => {
    const barHeight = Math.max(1.5, (plotHeight * value) / max);
    const x = margin.left + index * barWidth;
    const y = margin.top + plotHeight - barHeight;
    const rect = createSvgElement("rect", {
      x: (x + 0.6).toFixed(1),
      y: y.toFixed(1),
      width: Math.max(1, barWidth - 1.2).toFixed(1),
      height: barHeight.toFixed(1),
      rx: 1.5,
      fill: hasMarker && index === yourIndex ? "var(--lime)" : "var(--grid)",
      style: hasMarker && index === yourIndex ? "filter: drop-shadow(0 0 8px var(--lime-a))" : "",
    });
    appendTitle(rect, `${value} students`);
    svg.append(rect);
  });

  if (hasMarker) {
    const markerX = margin.left + yourIndex * barWidth + barWidth / 2;
    svg.append(
      createSvgElement(
        "text",
        {
          x: markerX.toFixed(1),
          y: margin.top + plotHeight - (plotHeight * bins[yourIndex]) / max - 9,
          class: "chart-label histogram-marker",
          "text-anchor": "middle",
        },
        "твой XP",
      ),
    );
  }

  svg.append(
    createSvgElement("text", { x: margin.left, y: height - 12, class: "chart-label", "text-anchor": "start" }, "0 XP"),
    createSvgElement(
      "text",
      { x: width - margin.right, y: height - 12, class: "chart-label", "text-anchor": "end" },
      formatExactNumber(domainMax),
    ),
    createSvgElement("text", { x: (margin.left + width - margin.right) / 2, y: height - 12, class: "chart-label", "text-anchor": "middle" }, "XP →"),
  );

  container.append(svg);
}

function generateSnapshotBins(values, count) {
  const binCount = Math.max(1, Number.isFinite(count) ? Math.round(count) : 50);
  const maximum = Math.max(1, ...values);
  const bins = Array.from({ length: binCount }, () => 0);

  for (const value of values) {
    const index = Math.min(binCount - 1, Math.max(0, Math.floor((Math.max(0, value) / maximum) * binCount)));
    bins[index] += 1;
  }

  return bins;
}
