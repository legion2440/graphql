import {
  renderActivityHeatmap,
  renderCompareChart,
  renderDistributionHistogram,
  renderRadarChart,
} from "./charts.js?v=20260629-stats-snapshot2";
import {
  buildActivityHeatmapData,
  calculateAuditPercentages,
  calculateCumulativeXp,
  calculateTotalXp,
  deriveProfileInsights,
  formatDate,
  formatExactNumber,
  formatInteger,
  formatNumber,
  formatRawXp,
  formatXp,
  getAuditMeta,
  getDisplayFirstName,
  getFirstName,
  getInitials,
  getLastXpTransaction,
  getProjectName,
  groupXpByProject,
} from "./data.js?v=20260629-public-profile2";
import {
  LEADERBOARD_SNAPSHOT,
  LEADERBOARD_SNAPSHOT_META,
} from "./leaderboard-snapshot.js?v=20260628-live-data10";

export const elements = {
  root: document.querySelector("#app-root"),
  loginView: document.querySelector("#login-view"),
  loadingView: document.querySelector("#loading-view"),
  dashboardView: document.querySelector("#dashboard-view"),
  loginForm: document.querySelector("#login-form"),
  identifier: document.querySelector("#identifier"),
  password: document.querySelector("#password"),
  loginButton: document.querySelector("#login-button"),
  loginError: document.querySelector("#login-error"),
  logoutButton: document.querySelector("#logout-button"),
  themeToggle: document.querySelector("#theme-toggle"),
  themeLabel: document.querySelector("#theme-label"),
  headerAvatar: document.querySelector("#header-avatar"),
  loadingProgress: document.querySelector("#loading-progress"),
  stages: {
    signinRequest: document.querySelector("#stage-signin-request"),
    signinSuccess: document.querySelector("#stage-signin-success"),
    profileQuery: document.querySelector("#stage-profile-query"),
    xpQuery: document.querySelector("#stage-xp-query"),
    normalization: document.querySelector("#stage-normalization"),
    render: document.querySelector("#stage-render"),
  },
  tabs: [...document.querySelectorAll('[role="tab"][data-tab]')],
  panels: [...document.querySelectorAll('[role="tabpanel"]')],
  profileFirstName: document.querySelector("#profile-first-name"),
  profileHandle: document.querySelector("#profile-handle"),
  profileUserId: document.querySelector("#profile-user-id"),
  levelValue: document.querySelector("#level-value"),
  levelRing: document.querySelector("#level-ring"),
  statTotalXp: document.querySelector("#stat-total-xp"),
  statTotalXpRaw: document.querySelector("#stat-total-xp-raw"),
  statAuditRatio: document.querySelector("#stat-audit-ratio"),
  statProjectsPassed: document.querySelector("#stat-projects-passed"),
  statProjectsNote: document.querySelector("#stat-projects-note"),
  auditBalanceLabel: document.querySelector("#audit-balance-label"),
  statLatestXp: document.querySelector("#stat-latest-xp"),
  statLatestProject: document.querySelector("#stat-latest-project"),
  statLatestDate: document.querySelector("#stat-latest-date"),
  auditCard: document.querySelector("#audit-card"),
  auditBigRatio: document.querySelector("#audit-big-ratio"),
  auditStatusText: document.querySelector("#audit-status-text"),
  auditStatusNote: document.querySelector("#audit-status-note"),
  auditUpValue: document.querySelector("#audit-up-value"),
  auditDownValue: document.querySelector("#audit-down-value"),
  auditUpBar: document.querySelector("#audit-up-bar"),
  auditDownBar: document.querySelector("#audit-down-bar"),
  infoLogin: document.querySelector("#info-login"),
  infoId: document.querySelector("#info-id"),
  activitySummary: document.querySelector("#activity-summary"),
  activityHeatmap: document.querySelector("#activity-heatmap"),
  cumulativeChart: document.querySelector("#cumulative-chart"),
  projectChart: document.querySelector("#project-chart"),
  projectListMore: document.querySelector("#project-list-more"),
  projectListAll: document.querySelector("#project-list-all"),
  radialRatio: document.querySelector("#radial-ratio"),
  statsSkillsRadar: document.querySelector("#stats-skills-radar"),
  comparePeriod: document.querySelector("#compare-period"),
  comparePopulation: document.querySelector("#compare-population"),
  compareChart: document.querySelector("#compare-chart"),
  distributionChart: document.querySelector("#distribution-chart"),
  histogramBins: document.querySelector("#histogram-bins"),
  histogramBinsLabel: document.querySelector("#histogram-bins-label"),
  distributionButtons: [...document.querySelectorAll("[data-distribution-mode]")],
  techRadar: document.querySelector("#tech-radar"),
  technologyRadar: document.querySelector("#technology-radar"),
  boardFilterButtons: [...document.querySelectorAll("[data-board-filter]")],
  boardSearchInput: document.querySelector("#board-search-input"),
  boardCountTitle: document.querySelector("#board-count-title"),
  boardCountNote: document.querySelector("#board-count-note"),
  leaderboardRows: document.querySelector("#leaderboard-rows"),
  publicRadar: document.querySelector("#public-radar"),
  publicRadarButtons: [...document.querySelectorAll("[data-public-radar]")],
  publicAvatar: document.querySelector("#public-avatar"),
  publicName: document.querySelector("#public-name"),
  publicHandle: document.querySelector("#public-handle"),
  publicTotalXp: document.querySelector("#public-total-xp"),
  publicAuditRatio: document.querySelector("#public-audit-ratio"),
  profileCampus: document.querySelector("#profile-campus"),
  profileCohort: document.querySelector("#profile-cohort"),
  profileRankPill: document.querySelector("#profile-rank-pill"),
  levelNextLabel: document.querySelector("#level-next-label"),
  levelNextNote: document.querySelector("#level-next-note"),
  currentRankCard: document.querySelector("#current-rank-card"),
  currentRankValue: document.querySelector("#current-rank-value"),
  nextRankLabel: document.querySelector("#next-rank-label"),
  nextRankDistance: document.querySelector("#next-rank-distance"),
  nextRankProgress: document.querySelector("#next-rank-progress"),
  checkpointValue: document.querySelector("#checkpoint-value"),
  checkpointNote: document.querySelector("#checkpoint-note"),
  lastSkillValue: document.querySelector("#last-skill-value"),
  lastSkillNote: document.querySelector("#last-skill-note"),
  progressWarning: document.querySelector("#progress-warning"),
  rankLadder: document.querySelector("#rank-ladder"),
  forecastTable: document.querySelector("#forecast-table"),
  timelineRow: document.querySelector("#timeline-row"),
  technicalSkillGrid: document.querySelector("#technical-skill-grid"),
  technologySkillGrid: document.querySelector("#technology-skill-grid"),
  skillBreakdown: document.querySelector("#skill-breakdown"),
  compareLegend: document.querySelector("#compare-legend"),
  publicMeta: document.querySelector("#public-meta"),
  publicAvailability: document.querySelector("#public-availability"),
  publicLevel: document.querySelector("#public-level"),
  teamTags: document.querySelector("#team-tags"),
  teamRank: document.querySelector("#team-rank"),
  friendGrid: document.querySelector("#friend-grid"),
};

const loadingStageContent = {
  signinRequest: ["→", " POST /api/auth/signin ", "ожидание"],
  signinSuccess: ["→", " signin response ", "ожидание"],
  profileQuery: ["→", " query PROFILE_QUERY { user · audits } ", "ожидание"],
  xpQuery: ["→", " query XP + optional enrichment ", "ожидание"],
  normalization: ["→", " normalize live profile data ", "ожидание"],
  render: ["→", " render dashboard ", "ожидание"],
};

const renderedStaticCharts = new Set();
let activeTab = "profile";
let profileCountUpDone = false;
let currentModel = null;
let distributionMode = "all";
let comparePeriod = "6m";
let comparePopulation = "all";
let boardFilter = "all";
let boardSearchQuery = "";
let publicRadarMode = "top";
let projectListLimit = 10;

const PROJECT_LIST_STEP = 10;
const fixedXpFormatter = new Intl.NumberFormat("ru-RU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const avatarGradients = [
  "linear-gradient(135deg,#f472b6,#a855f7)",
  "linear-gradient(135deg,#2dd4bf,#3b82f6)",
  "linear-gradient(135deg,#fbbf24,#f97316)",
  "linear-gradient(135deg,#818cf8,#6366f1)",
  "linear-gradient(135deg,#38bdf8,#2563eb)",
  "linear-gradient(135deg,#a3e635,#22c55e)",
  "linear-gradient(135deg,#fb7185,#e11d48)",
  "linear-gradient(135deg,#34d399,#0ea5e9)",
];

const leaderboardStudents = LEADERBOARD_SNAPSHOT.map((student, index) => ({
  ...student,
  name: student.displayName || student.login,
  handle: `@${student.login}`,
  project: student.currentProject || student.lastProject || "—",
  avatar: avatarGradients[index % avatarGradients.length],
}));

const publicRadarData = {
  top: [
    { label: "Go", value: 88 },
    { label: "Algo", value: 82 },
    { label: "Back", value: 78 },
    { label: "SQL", value: 74 },
    { label: "Front", value: 70 },
    { label: "Git", value: 86 },
  ],
  all: [
    { label: "Go", value: 86 },
    { label: "Git", value: 100 },
    { label: "JS", value: 43 },
    { label: "HTML", value: 75 },
    { label: "CSS", value: 50 },
    { label: "SQL", value: 33 },
    { label: "Unix", value: 17 },
    { label: "Docker", value: 15 },
    { label: "Rust", value: 0 },
    { label: "GraphQL", value: 0 },
  ],
};

const publicProfileRadarData = {
  top: publicRadarData.top,
  all: [
    { label: "Prog", value: 84 },
    { label: "Algo", value: 82 },
    { label: "Back", value: 78 },
    { label: "Front", value: 70 },
    { label: "DevOps", value: 52 },
    { label: "Game", value: 60 },
    { label: "AI", value: 44 },
    { label: "Crypto", value: 58 },
  ],
};

const PUBLIC_PROFILE_SNAPSHOT_META = Object.freeze({
  capturedDate: "2026-06-29",
});

const PUBLIC_TEAMWORK_SNAPSHOT = Object.freeze({
  tags: [
    ["🤝", "Командный игрок", "22 совместных проекта"],
    ["⚖", "Честный аудитор", "48 проведённых аудитов"],
    ["⚡", "Серия 14 дней", "активность подряд"],
  ],
  rank: {
    icon: "🥷",
    name: "Network Ninja",
    note: "работал с 30+ разными студентами",
    score: "34",
    scoreLabel: "человек в команде",
    progress: 68,
    nextRank: "Teamwork Titan",
    nextNote: " — поработай с 50 студентами (осталось 16)",
  },
  bestFriends: [
    ["Madina Altynbek", "@maltynbek", "9 проектов", "friend-madina", "MA"],
    ["Timur Kim", "@tkim", "7 проектов", "friend-timur", "TK"],
    ["Sofia Lee", "@slee", "6 проектов", "friend-sofia", "SL"],
  ],
  newFriends: [
    ["Bekzat Orynbek", "@borynbek", "на graphql", "friend-bekzat", "BO"],
    ["Aigerim Onalbaeva", "@aonalba", "на real-time-forum", "friend-aigerim", "AO"],
  ],
  extraReward: "+148 kB",
});

const initialPlaceholderTargets = [...document.querySelectorAll("#dashboard-view [data-placeholder]")];

function formatSnapshotDate(capturedDate) {
  const [year, month, day] = String(capturedDate || "").split("-");
  return year && month && day ? `${day}.${month}.${year}` : "";
}

function getSnapshotTooltipText(meta) {
  const snapshotDate = formatSnapshotDate(meta?.capturedDate);
  return snapshotDate ? `snapshot от ${snapshotDate}` : "";
}

function getPlaceholderTooltipText(meta = null) {
  const snapshotText = getSnapshotTooltipText(meta);
  return snapshotText ? `Under construction (${snapshotText})` : "Under construction";
}

function setText(element, value) {
  if (element) {
    element.textContent = value;
  }
}

function formatXpFixed(value) {
  const safe = Number.isFinite(value) ? value : 0;
  const sign = safe < 0 ? "-" : "";
  const absolute = Math.abs(safe);

  if (absolute >= 1_000_000) {
    return `${sign}${fixedXpFormatter.format(absolute / 1_000_000)} MB`;
  }

  if (absolute >= 1_000) {
    return `${sign}${fixedXpFormatter.format(absolute / 1_000)} kB`;
  }

  return `${sign}${fixedXpFormatter.format(absolute / 1_000)} kB`;
}

function setActiveButton(buttons, value, attribute) {
  for (const button of buttons) {
    button.classList.toggle("active", button.dataset[attribute] === value);
  }
}

function setStageLine(element, prefix, label, status, state) {
  const arrow = document.createElement("span");
  arrow.textContent = prefix;
  const strong = document.createElement("strong");
  strong.textContent = status;

  if (state === "active" && element?.id === "stage-render") {
    strong.className = "cursor";
  }

  element.replaceChildren(arrow, document.createTextNode(label), strong);
}

function setStageState(key, state, status) {
  const element = elements.stages[key];
  if (!element) {
    return;
  }

  const [prefix, label, defaultStatus] = loadingStageContent[key];
  element.dataset.stageState = state;
  setStageLine(element, prefix, label, status ?? defaultStatus, state);
}

function setLoadingProgress(completedCount) {
  const total = Object.keys(elements.stages).length;
  const percent = Math.round((completedCount / total) * 100);
  elements.loadingProgress.style.width = `${Math.max(0, Math.min(100, percent))}%`;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function animateNumber(element, target, formatter, decimals = 0) {
  if (!element) {
    return;
  }

  if (prefersReducedMotion()) {
    element.textContent = formatter(target);
    return;
  }

  const duration = 950;
  const start = performance.now();
  const ease = (value) => 1 - (1 - value) ** 3;
  const safeTarget = Number.isFinite(target) ? target : 0;

  const step = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const value = safeTarget * ease(progress);
    element.textContent = formatter(Number(value.toFixed(decimals)));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.textContent = formatter(safeTarget);
    }
  };

  requestAnimationFrame(step);
}

function animateRing(element, targetPercent) {
  if (!element) {
    return;
  }

  const safeTarget = Math.max(0, Math.min(100, Number.isFinite(targetPercent) ? targetPercent : 0));
  const paint = (value) => {
    element.style.background = `conic-gradient(var(--blue) ${value}%, var(--grid) 0)`;
  };

  if (prefersReducedMotion()) {
    paint(safeTarget);
    return;
  }

  const duration = 950;
  const start = performance.now();
  const ease = (value) => 1 - (1 - value) ** 3;
  const step = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    paint(Number((safeTarget * ease(progress)).toFixed(2)));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      paint(safeTarget);
    }
  };

  paint(0);
  requestAnimationFrame(step);
}

function getDataNumber(element, name, fallback) {
  const value = Number(element?.dataset?.[name]);
  return Number.isFinite(value) ? value : fallback;
}

function markLive(...targets) {
  for (const target of targets) {
    if (!target) {
      continue;
    }
    target.removeAttribute("data-placeholder");
    target.removeAttribute("data-provenance");
    target.removeAttribute("data-snapshot-date");
    target.removeAttribute("tabindex");
    target.removeAttribute("aria-label");
  }
}

function markSnapshot(meta, ...targets) {
  const snapshotText = getSnapshotTooltipText(meta);
  const snapshotDate = formatSnapshotDate(meta?.capturedDate);
  for (const target of targets) {
    if (!target || !snapshotText || !snapshotDate) {
      continue;
    }

    target.dataset.provenance = "snapshot";
    target.dataset.snapshotDate = snapshotDate;
    target.setAttribute("aria-label", snapshotText);
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "0");
    }
  }
}

function clearProvenance(root = elements.dashboardView) {
  root?.querySelectorAll?.('[data-provenance="snapshot"]').forEach((target) => {
    target.removeAttribute("data-provenance");
    target.removeAttribute("data-snapshot-date");
    if (target.getAttribute("aria-label")?.startsWith("snapshot от ")) {
      target.removeAttribute("aria-label");
    }
    if (!target.hasAttribute("data-placeholder")) {
      target.removeAttribute("tabindex");
    }
  });
}

function restoreInitialPlaceholders() {
  for (const target of initialPlaceholderTargets) {
    if (!target.isConnected) {
      continue;
    }
    target.setAttribute("data-placeholder", "");
    target.setAttribute("aria-label", "Under construction");
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "0");
    }
  }
}

function clearPlaceholderAncestors(...targets) {
  for (const target of targets) {
    markLive(target, target?.closest?.("[data-placeholder]"));
  }
}

function createEl(tagName, className = "", text = "") {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== "") {
    element.textContent = text;
  }
  return element;
}

function formatLevelDistance(nextRank, level) {
  if (!nextRank) {
    return "максимальный ранг";
  }
  const distance = Math.max(0, nextRank.level - level);
  return `${distance} ${distance === 1 ? "уровень" : "ур."}`;
}

function formatCampusLabel(value) {
  const label = String(value || "").trim();
  const normalized = label.toLowerCase();

  if (normalized === "astanahub" || normalized === "astana") {
    return "AstanaHub";
  }

  return label;
}

function formatBatchLabel(value) {
  const label = String(value || "").trim();
  const match = label.match(/^Batch\s+(.+)$/i);

  return match ? match[1].trim() : label;
}

function formatProjectStatus(status) {
  const map = {
    setup: "setup",
    working: "в работе",
    finished: "готово",
    audit: "аудит",
  };
  return map[status] || status || "статус неизвестен";
}

function getObjectNameFromPath(path) {
  const segments = String(path || "").split("/").filter(Boolean);
  return segments.at(-1) || "project";
}

function renderRankLadder(insights) {
  if (!elements.rankLadder) {
    return;
  }

  markLive(elements.rankLadder.closest("[data-placeholder]"));
  markSnapshot(insights.rankSnapshotMeta, elements.rankLadder.closest(".wide-card"));
  elements.rankLadder.replaceChildren();

  for (const rank of insights.ranks) {
    const item = createEl("div");
    const marker = createEl("i");
    if (rank.name === insights.currentRank?.name) {
      marker.className = "current";
    } else if (Number.isFinite(insights.level) && rank.level <= insights.level) {
      marker.className = "done";
    }
    const name = createEl("strong", "", rank.name);
    const level = createEl("span", "", `≥ LVL ${rank.level}`);
    item.append(marker, name, level);
    if (rank.name === insights.currentRank?.name) {
      item.append(createEl("em", "", "сейчас"));
    } else if (Number.isFinite(insights.level) && rank.level <= insights.level) {
      item.append(createEl("em", "", "пройдено"));
    }
    elements.rankLadder.append(item);
  }
}

function renderForecast(insights) {
  if (!elements.forecastTable) {
    return;
  }

  markLive(elements.forecastTable.closest("[data-placeholder]"));
  markSnapshot(insights.forecastSnapshotMeta, elements.forecastTable.closest(".wide-card"));
  const rows = insights.timelineRows;
  const currentIndex = rows.findIndex((row) => row === insights.timelineCurrent);
  const current = rows[currentIndex] ?? null;
  const next = currentIndex >= 0 ? rows[currentIndex + 1] ?? rows.at(-1) ?? null : null;
  elements.forecastTable.replaceChildren();

  const head = createEl("div", "forecast-head");
  head.append(createEl("span", "", "МЕТРИКА"), createEl("span", "", "СЕЙЧАС"), createEl("span", "", current?.label || "ТЕКУЩИЙ"), createEl("span", "", next?.label || "СЛЕД."));
  elements.forecastTable.append(head);

  if (currentIndex < 0) {
    const unavailableRow = createEl("div");
    unavailableRow.append(
      createEl("span", "", "Timeline"),
      createEl("strong", "", Number.isFinite(insights.level) ? String(insights.level) : "—"),
      createEl("span", "", "текущая позиция неизвестна"),
      createEl("span", "", rows.length > 0 ? "нужна подтверждённая дата старта" : "metadata недоступна"),
    );
    elements.forecastTable.append(unavailableRow);
    return;
  }

  const levelRow = createEl("div");
  levelRow.append(
    createEl("span", "", "Уровень"),
    createEl("strong", "", Number.isFinite(insights.level) ? String(insights.level) : "—"),
    createEl("span", "", current ? `мин ${current.minLevel} · ожид ${current.expectedLevel}` : "—"),
    createEl("span", "", next ? `мин ${next.minLevel} · ожид ${next.expectedLevel}` : "—"),
  );
  const checkpointRow = createEl("div");
  checkpointRow.append(
    createEl("span", "", "Checkpoint"),
    createEl("strong", "lime-text", String(current?.checkpointLevel ?? "—")),
    createEl("span", "", current ? String(current.checkpointLevel) : "—"),
    createEl("span", "", next ? String(next.checkpointLevel) : "—"),
  );
  const rankRow = createEl("div");
  rankRow.append(
    createEl("span", "", "Ранг"),
    createEl("strong", "", insights.currentRank?.name || "—"),
    createEl("span", "", current?.rank || insights.currentRank?.name || "—"),
    createEl("span", "", next?.rank || insights.nextRank?.name || "—"),
  );
  elements.forecastTable.append(levelRow, checkpointRow, rankRow);
}

function renderTimeline(insights) {
  if (!elements.timelineRow) {
    return;
  }

  markLive(elements.timelineRow.closest("[data-placeholder]"));
  markSnapshot(insights.timelineSnapshotMeta, elements.timelineRow.closest(".wide-card"));
  elements.timelineRow.replaceChildren();

  if (insights.timelineRows.length === 0) {
    elements.timelineRow.replaceChildren(createEl("p", "chart-empty", "Timeline metadata недоступна."));
    return;
  }

  for (const row of insights.timelineRows) {
    const item = createEl("div");
    if (row === insights.timelineCurrent) {
      item.className = "current";
    }
    item.append(
      createEl("span", "", row.label),
      createEl("strong", "", String(row.minLevel)),
      createEl("strong", "", String(row.expectedLevel)),
      createEl("strong", "", String(row.checkpointLevel)),
    );
    if (row.notes) {
      item.title = row.notes;
    }
    elements.timelineRow.append(item);
  }
}

function getSkillTierClass(tier) {
  switch (tier) {
    case "Code Explorer":
      return "tier-code";
    case "Bug Squasher":
      return "tier-bug";
    case "Script Wizard":
      return "tier-script";
    case "Master Hacker":
      return "tier-master";
    default:
      return "tier-none";
  }
}

function getSkillTierStars(tier) {
  switch (tier) {
    case "Code Explorer":
      return "★☆☆";
    case "Bug Squasher":
      return "★★☆";
    case "Script Wizard":
      return "★★★";
    case "Master Hacker":
      return "★★★★";
    default:
      return "";
  }
}

function renderSkillCard(skill, snapshotMeta = null) {
  const card = createEl("article", "skill-card ts-card");
  const top = createEl("div");
  top.append(createEl("strong", "", skill.label), createEl("span", "", `${skill.completed}/${skill.total}`));
  const currentTier = skill.currentTier || "No progress yet";
  const tier = createEl("em", getSkillTierClass(skill.currentTier));
  tier.append(createEl("span", "tier-name", currentTier));
  const stars = getSkillTierStars(skill.currentTier);
  if (stars) {
    tier.append(createEl("span", "tier-stars", stars));
  }
  tier.setAttribute("data-placeholder", "");
  tier.setAttribute("tabindex", "0");
  tier.setAttribute(
    "aria-label",
    skill.maxTier ? `${getPlaceholderTooltipText(snapshotMeta)} · Max Tier: ${skill.maxTier}` : getPlaceholderTooltipText(snapshotMeta),
  );
  const bar = createEl("i", "ts-fill");
  bar.style.width = `${Math.max(0, Math.min(100, skill.value))}%`;
  card.append(top, tier, bar);
  return card;
}

function renderSkillGrid(container, skills, snapshotMeta = null) {
  if (!container) {
    return;
  }

  markLive(container.closest("[data-placeholder]"));
  markSnapshot(snapshotMeta, container.closest("section"));
  container.replaceChildren();
  for (const skill of skills) {
    container.append(renderSkillCard(skill, snapshotMeta));
  }
}

function renderSkillBreakdown(skills) {
  if (!elements.skillBreakdown) {
    return;
  }

  markLive(elements.skillBreakdown.closest("[data-placeholder]"));
  markSnapshot(currentModel?.insights?.skillsSnapshotMeta, elements.skillBreakdown.closest(".wide-card"));
  elements.skillBreakdown.replaceChildren();
  for (const skill of skills.slice(0, 6)) {
    const row = createEl("div");
    const label = createEl("span", "", skill.label);
    const track = createEl("i");
    const fill = createEl("b", "ts-fill");
    fill.style.width = `${Math.max(0, Math.min(100, skill.value))}%`;
    track.append(fill);
    row.append(label, track, createEl("strong", "", String(skill.value)));
    elements.skillBreakdown.append(row);
  }
}

function renderProjectXpList(projects = currentModel?.projects ?? []) {
  if (!elements.projectChart) {
    return;
  }

  const rows = Array.isArray(projects) ? projects : [];
  elements.projectChart.replaceChildren();

  if (rows.length === 0) {
    const empty = createEl("p", "chart-empty", "No project XP data is available.");
    elements.projectChart.append(empty);
    if (elements.projectListMore) {
      elements.projectListMore.hidden = true;
    }
    if (elements.projectListAll) {
      elements.projectListAll.hidden = true;
    }
    return;
  }

  const visibleRows = rows.slice(0, projectListLimit);
  for (const project of visibleRows) {
    const row = createEl("div", "project-xp-row");
    const name = createEl("span", "project-xp-name", project.name);
    const value = createEl("strong", "project-xp-value", formatXpFixed(project.xp));
    row.title = `${project.name} — ${formatRawXp(project.xp)}`;
    row.append(name, value);
    elements.projectChart.append(row);
  }

  const hasHiddenRows = visibleRows.length < rows.length;
  if (elements.projectListMore) {
    elements.projectListMore.hidden = !hasHiddenRows;
    elements.projectListMore.textContent = "Показать следующие";
  }
  if (elements.projectListAll) {
    elements.projectListAll.hidden = !hasHiddenRows;
  }
  if (rows.length <= PROJECT_LIST_STEP && elements.projectListMore) {
    elements.projectListMore.hidden = true;
  }
}

function renderTeamwork() {
  if (elements.teamTags) {
    elements.teamTags.replaceChildren();
    for (const [icon, title, note] of PUBLIC_TEAMWORK_SNAPSHOT.tags) {
      const item = createEl("div");
      item.append(createEl("span", "", icon), createEl("strong", "", title), createEl("small", "", note));
      elements.teamTags.append(item);
    }
  }

  if (elements.teamRank) {
    const rank = PUBLIC_TEAMWORK_SNAPSHOT.rank;
    elements.teamRank.replaceChildren();
    const title = createEl("div", "team-rank-title");
    title.append(
      createEl("span", "team-rank-emoji", rank.icon),
      (() => {
        const wrap = createEl("div");
        wrap.append(
          createEl("strong", "", rank.name),
          createEl("span", "", rank.note),
        );
        return wrap;
      })(),
    );
    const score = createEl("div", "team-rank-score");
    score.append(createEl("b", "", rank.score), createEl("span", "", rank.scoreLabel));
    const bar = createEl("i");
    const fill = createEl("span", "ts-fill");
    fill.style.width = `${rank.progress}%`;
    bar.append(fill);
    const note = createEl("p");
    note.append(document.createTextNode("След. ранг "), createEl("strong", "", rank.nextRank), document.createTextNode(rank.nextNote));
    elements.teamRank.append(title, score, bar, note);
  }

  if (elements.friendGrid) {
    elements.friendGrid.replaceChildren();
    const bestFriends = createEl("div");
    bestFriends.append(createEl("h4", "", "ЧАЩЕ ВСЕГО РАБОТАЛ С"));
    for (const [name, handle, count, avatarClass, initials] of PUBLIC_TEAMWORK_SNAPSHOT.bestFriends) {
      const row = createEl("p");
      row.append(
        createEl("i", avatarClass, initials),
        (() => {
          const wrap = createEl("span");
          wrap.append(document.createTextNode(name), createEl("small", "", handle));
          return wrap;
        })(),
        createEl("b", "", count),
      );
      bestFriends.append(row);
    }
    const newFriends = createEl("div");
    newFriends.append(createEl("h4", "", "НОВЫЕ НАПАРНИКИ"));
    for (const [name, handle, project, avatarClass, initials] of PUBLIC_TEAMWORK_SNAPSHOT.newFriends) {
      const row = createEl("p");
      row.append(
        createEl("i", avatarClass, initials),
        (() => {
          const wrap = createEl("span");
          wrap.append(document.createTextNode(name), createEl("small", "", handle));
          return wrap;
        })(),
        createEl("b", "", project),
      );
      newFriends.append(row);
    }
    const extraAward = createEl("div", "extra-award");
    extraAward.append(createEl("span", "", "Доп. награды за аудит"), createEl("strong", "", PUBLIC_TEAMWORK_SNAPSHOT.extraReward));
    newFriends.append(extraAward);
    elements.friendGrid.append(bestFriends, newFriends);
  }

  markSnapshot(PUBLIC_PROFILE_SNAPSHOT_META, elements.teamTags?.closest("[data-placeholder]"));
}

function maybeRunProfileCountUp(model) {
  if (profileCountUpDone || activeTab !== "profile") {
    return;
  }

  profileCountUpDone = true;
  animateNumber(elements.statTotalXp, model.totalXp, formatXp, 0);
  animateNumber(elements.statAuditRatio, model.user.auditRatio, formatNumber, 2);
  if (Number.isFinite(model.insights.level)) {
    animateNumber(elements.levelValue, model.insights.level, String, 0);
  }
  if (model.insights.hasProgressData || model.insights.skillsSnapshotMeta) {
    animateNumber(elements.statProjectsPassed, model.insights.doneProgressCount, String, 0);
  } else {
    setText(elements.statProjectsPassed, "—");
  }
  animateRing(elements.levelRing, model.insights.rankProgress ?? 0);
}

function buildModel(user, transactions, details = null) {
  const insights = deriveProfileInsights(user, details ?? {}, transactions);
  const totalXp = Number.isFinite(insights.eventXpTotal) && insights.eventXpTotal > 0 ? insights.eventXpTotal : calculateTotalXp(transactions);
  const cumulativeXp = calculateCumulativeXp(transactions);
  const projects = groupXpByProject(transactions);
  const latest = getLastXpTransaction(transactions);
  const heatmap = buildActivityHeatmapData(transactions);

  return {
    user,
    transactions,
    totalXp,
    cumulativeXp,
    projects,
    latest,
    heatmap,
    details,
    insights,
  };
}

function radarAxes(skills, limit = 8) {
  return skills
    .filter((skill) => skill.total > 0)
    .slice(0, limit)
    .map((skill) => ({
      label: skill.key.length <= 8 ? skill.key : skill.label.split(/\s+/).map((word) => word[0]).join(""),
      value: skill.value,
    }));
}

const compareMonthFormatter = new Intl.DateTimeFormat("ru-RU", {
  month: "short",
  year: "2-digit",
});

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function nextMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function formatCompareMonth(date) {
  return compareMonthFormatter.format(date).replace(" г.", "");
}

function getCurrentSnapshotStudent(model) {
  const login = model?.user?.login?.toLowerCase();
  return login ? leaderboardStudents.find((student) => student.login.toLowerCase() === login) ?? null : null;
}

function getSnapshotAvatar(model) {
  return getCurrentSnapshotStudent(model)?.avatar || "";
}

function getCurrentBatch(model, snapshotStudent = getCurrentSnapshotStudent(model)) {
  return model?.insights?.batch || snapshotStudent?.batch || "";
}

function formatStreamName(batch) {
  const batchLabel = formatBatchLabel(batch);
  return batchLabel ? `Поток ${batchLabel}` : "поток";
}

function averageSnapshotXp(students) {
  const values = students.map((student) => student.xp).filter(Number.isFinite);
  return values.length > 0 ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function getCumulativeEntries(cumulativeEntries) {
  return (Array.isArray(cumulativeEntries) ? cumulativeEntries : [])
    .map((entry) => ({
      date: entry.transaction?.date,
      cumulative: Number(entry.cumulative),
    }))
    .filter(({ date, cumulative }) => date instanceof Date && Number.isFinite(date.getTime()) && Number.isFinite(cumulative))
    .sort((left, right) => left.date - right.date);
}

function addMonths(date, monthDelta) {
  return new Date(date.getFullYear(), date.getMonth() + monthDelta, date.getDate(), 0, 0, 0, 0);
}

function addDaysToDate(date, dayDelta) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + dayDelta, 23, 59, 59, 999);
}

function getComparePeriodStart(entries, period) {
  const firstDate = entries[0]?.date ?? new Date();
  const lastDate = entries.at(-1)?.date ?? firstDate;

  switch (period) {
    case "week":
      return addDaysToDate(lastDate, -6);
    case "month":
      return addMonths(lastDate, -1);
    case "3m":
      return addMonths(lastDate, -3);
    case "6m":
      return addMonths(lastDate, -6);
    case "start":
    default:
      return firstDate;
  }
}

function formatCompareDay(date) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
  }).format(date);
}

function formatCompareCutoff(date, period) {
  return period === "week" || period === "month" ? formatCompareDay(date) : formatCompareMonth(date);
}

function buildCompareCutoffs(startDate, endDate, period) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const cutoffs = [];

  if (period === "week") {
    for (let day = 0; day < 7; day += 1) {
      const point = addDaysToDate(start, day);
      cutoffs.push(point > end ? end : point);
    }
    return cutoffs;
  }

  if (period === "month") {
    const totalDays = Math.max(1, Math.ceil((end - start) / 86_400_000));
    for (let index = 0; index <= 4; index += 1) {
      const dayOffset = Math.round((totalDays * index) / 4);
      const point = addDaysToDate(start, dayOffset);
      cutoffs.push(point > end ? end : point);
    }
    return cutoffs;
  }

  let cursor = startOfMonth(start);
  while (cursor <= end) {
    const cutoff = endOfMonth(cursor);
    cutoffs.push(cutoff > end ? end : cutoff);
    cursor = nextMonth(cursor);
  }

  if (cutoffs.length === 0 || cutoffs.at(-1).getTime() !== end.getTime()) {
    cutoffs.push(end);
  }

  return cutoffs;
}

function cumulativeAt(entries, cutoffDate) {
  let carried = 0;
  for (const entry of entries) {
    if (entry.date <= cutoffDate) {
      carried = entry.cumulative;
    } else {
      break;
    }
  }
  return carried;
}

function estimateComparePeriodFactor(entries, period) {
  if (period === "start" || entries.length < 2) {
    return 1;
  }

  const first = entries[0].date;
  const last = entries.at(-1).date;
  const totalDays = Math.max(1, (last - first) / 86_400_000);
  const periodDays = {
    week: 7,
    month: 30,
    "3m": 91,
    "6m": 183,
  }[period] ?? totalDays;

  return Math.max(0.02, Math.min(1, periodDays / totalDays));
}

function buildLiveCompareSeries(cumulativeEntries, totalXp, period) {
  const entries = getCumulativeEntries(cumulativeEntries);
  const liveTotal = Math.max(0, Number.isFinite(totalXp) ? totalXp : entries.at(-1)?.cumulative ?? 0);

  if (entries.length === 0) {
    return {
      labels: ["сейчас"],
      values: [liveTotal],
    };
  }

  const endDate = entries.at(-1).date;
  const periodStart = getComparePeriodStart(entries, period);
  const startDate = period === "start" ? entries[0].date : periodStart;
  const baseline = period === "start" ? 0 : cumulativeAt(entries, startDate);
  const cutoffs = buildCompareCutoffs(startDate, endDate, period);
  const labels = cutoffs.map((date) => formatCompareCutoff(date, period));
  const values = cutoffs.map((date) => Math.max(0, cumulativeAt(entries, date) - baseline));

  if (period === "start") {
    values[values.length - 1] = liveTotal;
  }

  return {
    labels,
    values,
    periodFactor: estimateComparePeriodFactor(entries, period),
  };
}

function buildSnapshotCohortSeries(length, finalValue) {
  const safeLength = Math.max(1, Number.isFinite(length) ? Math.round(length) : 1);
  const safeFinal = Math.max(0, Number.isFinite(finalValue) ? finalValue : 0);

  if (safeLength === 1) {
    return [Math.round(safeFinal)];
  }

  return Array.from({ length: safeLength }, (_, index) => {
    const progress = (index + 1) / safeLength;
    return Math.round(safeFinal * Math.pow(progress, 1.18));
  });
}

function createCompareLegendItem(lineClass, text) {
  const item = createEl("span");
  item.append(createEl("i", lineClass), document.createTextNode(text));
  return item;
}

function renderCompareLegend(compareData) {
  if (!elements.compareLegend) {
    return;
  }

  if (!compareData) {
    elements.compareLegend.replaceChildren(createEl("span", "", "нет данных"));
    return;
  }

  elements.compareLegend.replaceChildren(
    createCompareLegendItem("solid", compareData.youLabel),
    createCompareLegendItem("dashed", compareData.cohortLabel),
  );
}

function buildCompareData(model) {
  if (!model) {
    return null;
  }

  const snapshotStudent = getCurrentSnapshotStudent(model);
  const currentBatch = getCurrentBatch(model, snapshotStudent);
  const populationStudents = comparePopulation === "batch" && currentBatch
    ? leaderboardStudents.filter((student) => student.batch === currentBatch)
    : leaderboardStudents;
  const cohortAverage = averageSnapshotXp(populationStudents.length > 0 ? populationStudents : leaderboardStudents);
  const liveSeries = buildLiveCompareSeries(model.cumulativeXp, model.totalXp, comparePeriod);
  const periodAdjustedAverage = cohortAverage * (liveSeries.periodFactor ?? 1);
  const liveTotal = liveSeries.values.at(-1) ?? model.totalXp;
  const populationName = comparePopulation === "batch" ? formatStreamName(currentBatch) : "All students";

  return {
    months: liveSeries.labels,
    you: liveSeries.values,
    cohort: buildSnapshotCohortSeries(liveSeries.values.length, periodAdjustedAverage),
    title: "Твой XP против потока",
    youLabel: `ты · ${formatXp(liveTotal)}`,
    cohortLabel: `${populationName} · ${formatXp(periodAdjustedAverage)}`,
  };
}

function renderCompareControls(model = currentModel) {
  const snapshotStudent = getCurrentSnapshotStudent(model);
  const currentBatch = getCurrentBatch(model, snapshotStudent);
  const batchLabel = currentBatch || "Batch";

  if (elements.comparePeriod) {
    elements.comparePeriod.value = comparePeriod;
  }

  if (elements.comparePopulation) {
    const batchOption = elements.comparePopulation.querySelector('option[value="batch"]');
    if (batchOption) {
      batchOption.textContent = batchLabel;
    }
    elements.comparePopulation.value = comparePopulation;
  }
}

function renderDashboardCharts(model = null) {
  if (!model) {
    if (!renderedStaticCharts.has("radars")) {
      renderRadarChart(elements.techRadar, publicRadarData.top, "Technical skills radar");
      renderRadarChart(elements.technologyRadar, publicRadarData.all, "Technologies radar");
      renderCompareChart(elements.compareChart, null);
      renderCompareLegend(null);
      renderCompareControls(null);
      renderedStaticCharts.add("radars");
    }
    renderDistribution();
    renderLeaderboard();
    renderPublicRadar();
    return;
  }

  const techAxes = radarAxes(model.insights.technicalSkills, 9);
  const technologyAxes = radarAxes(model.insights.technologySkills, 8);
  const compareData = buildCompareData(model);

  renderCompareControls(model);
  renderRadarChart(elements.techRadar, techAxes, "Live technical skills radar");
  renderRadarChart(elements.technologyRadar, technologyAxes, "Live technologies radar");
  renderCompareChart(elements.compareChart, compareData);
  renderCompareLegend(compareData);
  if (model.insights.hasProgressData) {
    markLive(
      elements.techRadar?.closest("[data-placeholder]"),
      elements.technologyRadar?.closest("[data-placeholder]"),
    );
    markSnapshot(
      model.insights.skillsSnapshotMeta,
      elements.techRadar?.closest(".wide-card"),
      elements.technologyRadar?.closest(".wide-card"),
    );
  }
  markLive(elements.compareChart?.closest("[data-placeholder]"));
  markSnapshot(LEADERBOARD_SNAPSHOT_META, elements.compareChart?.closest(".wide-card"));
  renderDistribution(model);
  renderLeaderboard();
  renderPublicRadar(model);
}

function renderDistribution(model = currentModel) {
  if (!elements.distributionChart || !elements.histogramBins) {
    return;
  }

  const bins = Number(elements.histogramBins.value);
  const currentSnapshotStudent = getCurrentSnapshotStudent(model);
  const currentBatch = getCurrentBatch(model, currentSnapshotStudent);
  const batchButton = elements.distributionButtons.find((button) => button.dataset.distributionMode === "batch");
  if (batchButton) {
    batchButton.textContent = currentBatch || "Batch";
  }
  const values =
    distributionMode === "batch"
      ? leaderboardStudents.filter((student) => student.batch === currentBatch).map((student) => student.xp)
      : leaderboardStudents.map((student) => student.xp);
  const markerValue = Number.isFinite(model?.totalXp) ? model.totalXp : currentSnapshotStudent?.xp ?? null;
  setText(elements.histogramBinsLabel, String(bins));
  setActiveButton(elements.distributionButtons, distributionMode, "distributionMode");
  renderDistributionHistogram(elements.distributionChart, bins, distributionMode, {
    values,
    markerValue,
  });
  markLive(elements.distributionChart.closest("[data-placeholder]"));
  markSnapshot(LEADERBOARD_SNAPSHOT_META, elements.distributionChart.closest(".wide-card"));
}

function renderPublicRadar(model = currentModel) {
  if (!elements.publicRadar) {
    return;
  }

  setActiveButton(elements.publicRadarButtons, publicRadarMode, "publicRadar");
  const axes = publicProfileRadarData[publicRadarMode] ?? publicProfileRadarData.top;
  renderRadarChart(elements.publicRadar, axes, "Public skills radar");
  markSnapshot(PUBLIC_PROFILE_SNAPSHOT_META, elements.publicRadar.closest(".radar-card"));
}

function formatLeaderboardXp(value) {
  return formatExactNumber(value);
}

function formatLeaderboardHours(value) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds)) {
    return "—";
  }
  return `${Math.round(seconds / 3600)}ч`;
}

function getTrendClass(trend) {
  if (trend === "up" || String(trend).startsWith("↑")) {
    return "trend-up";
  }
  if (trend === "down" || String(trend).startsWith("↓")) {
    return "trend-down";
  }
  return "trend-flat";
}

function formatLeaderboardTrend(student) {
  if (student.trend === "up") {
    return `↑${student.trendDelta ?? 0}`;
  }
  if (student.trend === "down") {
    return `↓${student.trendDelta ?? 0}`;
  }
  if (typeof student.trend === "string" && /^[↑↓→]/u.test(student.trend)) {
    return student.trend;
  }
  return "→0";
}

function normalizeSearchText(value) {
  return String(value || "").trim().toLowerCase();
}

function matchesBoardSearch(student, query) {
  const normalizedQuery = normalizeSearchText(query).replace(/^@/, "");
  if (!normalizedQuery) {
    return true;
  }

  return [
    student.login,
    student.handle,
    student.name,
    student.displayName,
  ].some((value) => normalizeSearchText(value).replace(/^@/, "").includes(normalizedQuery));
}

function renderLeaderboard() {
  if (!elements.leaderboardRows) {
    return;
  }

  const currentLogin = currentModel?.user?.login?.toLowerCase() ?? "";
  const sorted = [...leaderboardStudents].sort((left, right) => left.rank - right.rank || right.xp - left.xp);
  const batchFiltered = boardFilter === "all" ? sorted : sorted.filter((student) => student.batch === boardFilter);
  const filtered = batchFiltered.filter((student) => matchesBoardSearch(student, boardSearchQuery));
  const label = boardFilter === "all" ? "Все batch" : boardFilter;
  setText(elements.boardCountTitle, `${label} · ${filtered.length} студентов`);
  setText(elements.boardCountNote, `Статичный snapshot dashboard · показано: ${filtered.length}`);
  setActiveButton(elements.boardFilterButtons, boardFilter, "boardFilter");
  markLive(
    elements.boardFilterButtons[0]?.closest("[data-placeholder]"),
    elements.boardCountNote,
    elements.leaderboardRows.closest("[data-placeholder]"),
  );
  markSnapshot(
    LEADERBOARD_SNAPSHOT_META,
    elements.boardCountTitle,
    elements.boardFilterButtons[0]?.closest(".chip-row"),
    elements.boardCountNote,
    elements.leaderboardRows.closest(".leaderboard-card"),
  );
  elements.leaderboardRows.replaceChildren();

  if (filtered.length === 0) {
    const row = document.createElement("div");
    row.className = "leader-empty";
    row.textContent = "Ничего не найдено";
    elements.leaderboardRows.append(row);
    return;
  }

  filtered.forEach((student) => {
    const rank = student.rank;
    const isCurrentUser = currentLogin !== "" && student.login.toLowerCase() === currentLogin;
    const row = document.createElement("div");
    row.className = "leader-row";
    if (isCurrentUser) {
      row.classList.add("is-you");
    }

    const rankCell = document.createElement("span");
    rankCell.className = `leader-rank${rank <= 3 ? ` rank-${rank}` : ""}`;
    rankCell.textContent = String(rank);

    const avatar = document.createElement("span");
    avatar.className = "leader-avatar";
    avatar.style.background = student.avatar;
    avatar.textContent = getInitials(student.name);

    const person = document.createElement("div");
    person.className = "leader-person";
    const nameLine = document.createElement("span");
    nameLine.className = "leader-name-line";
    const name = document.createElement("b");
    name.textContent = student.name;
    nameLine.append(name);
    if (isCurrentUser) {
      const badge = document.createElement("span");
      badge.className = "you-badge";
      badge.textContent = "ты";
      nameLine.append(badge);
    }
    const meta = document.createElement("small");
    meta.textContent = `${student.handle} · ${student.batch}`;
    person.append(nameLine, meta);

    const level = document.createElement("span");
    level.textContent = String(student.level);

    const xp = document.createElement("span");
    xp.textContent = formatLeaderboardXp(student.xp);

    const hours = document.createElement("span");
    hours.textContent = formatLeaderboardHours(student.hoursInRange);

    const project = document.createElement("span");
    project.textContent = student.project;

    const trend = document.createElement("em");
    trend.className = getTrendClass(student.trend);
    trend.textContent = formatLeaderboardTrend(student);

    row.append(rankCell, avatar, person, level, xp, hours, project, trend);
    elements.leaderboardRows.append(row);
  });
}

function bindTabButton(button) {
  button.addEventListener("click", () => {
    setActiveTab(button.dataset.tab);
  });

  button.addEventListener("keydown", (event) => {
    const currentIndex = elements.tabs.indexOf(button);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % elements.tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + elements.tabs.length) % elements.tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = elements.tabs.length - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveTab(button.dataset.tab);
      return;
    } else {
      return;
    }

    event.preventDefault();
    const nextButton = elements.tabs[nextIndex];
    nextButton.focus();
    setActiveTab(nextButton.dataset.tab);
  });
}

export function setActiveTab(tabName) {
  const nextTab = elements.tabs.some((button) => button.dataset.tab === tabName)
    ? tabName
    : "profile";
  activeTab = nextTab;

  for (const button of elements.tabs) {
    const selected = button.dataset.tab === nextTab;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  }

  for (const panel of elements.panels) {
    panel.hidden = panel.id !== `panel-${nextTab}`;
  }

  document.dispatchEvent(new CustomEvent("under-construction-hide"));
  if (activeTab === "profile" && currentModel) {
    maybeRunProfileCountUp(currentModel);
  }
}

export function setView(viewName) {
  elements.loginView.hidden = viewName !== "login";
  elements.loadingView.hidden = viewName !== "loading";
  elements.dashboardView.hidden = viewName !== "dashboard";

  if (viewName === "dashboard") {
    setActiveTab(activeTab || "profile");
  }
}

export function setLoginLoading(isLoading) {
  elements.identifier.disabled = isLoading;
  elements.password.disabled = isLoading;
  elements.loginButton.disabled = isLoading;
  elements.loginButton.textContent = isLoading ? "Загрузка…" : "Войти и загрузить профиль →";
}

export function setLoginError(message = "") {
  elements.loginError.textContent = message ? `⚠ ${message}` : "";
}

export function resetLoadingStages({ restoredSession = false } = {}) {
  Object.keys(elements.stages).forEach((key) => {
    setStageState(key, "pending", "ожидание");
  });

  if (restoredSession) {
    setStageState("signinRequest", "skipped", "существующая JWT-сессия");
    setStageState("signinSuccess", "skipped", "новый signin не выполнялся");
    setLoadingProgress(2);
  } else {
    setLoadingProgress(0);
  }
}

export function updateLoadingStage(key, state, status) {
  setStageState(key, state, status);
  const completed = Object.values(elements.stages).filter((element) =>
    ["done", "skipped"].includes(element.dataset.stageState),
  ).length;
  setLoadingProgress(completed);
}

export function resetDashboard() {
  profileCountUpDone = false;
  currentModel = null;
  document.dispatchEvent(new CustomEvent("under-construction-hide"));
  clearProvenance();
  restoreInitialPlaceholders();
  setText(elements.headerAvatar, "—");
  setText(elements.profileFirstName, "—");
  setText(elements.profileHandle, "@—");
  setText(elements.profileUserId, "#—");
  setText(elements.levelValue, "—");
  setText(elements.profileRankPill, "—");
  setText(elements.levelNextLabel, "до LVL —");
  setText(elements.levelNextNote, "нет данных");
  setText(elements.statProjectsPassed, "—");
  setText(elements.statProjectsNote, "—");
  setText(elements.statTotalXp, "—");
  setText(elements.statTotalXpRaw, "—");
  setText(elements.statAuditRatio, "0");
  setText(elements.auditBigRatio, "0");
  setText(elements.statLatestXp, "Нет данных");
  setText(elements.statLatestProject, "Нет проекта");
  setText(elements.statLatestDate, "Нет даты");
  setText(elements.infoLogin, "—");
  setText(elements.infoId, "#—");
  setText(elements.profileCampus, "—");
  setText(elements.profileCohort, "—");
  setText(elements.publicAvatar, "—");
  setText(elements.publicName, "—");
  setText(elements.publicHandle, "@—");
  setText(elements.publicMeta, "· Поток —");
  setText(elements.publicAvailability, "Доступен");
  setText(elements.publicLevel, "—");
  setText(elements.publicTotalXp, "—");
  setText(elements.publicAuditRatio, "0");
  setText(elements.currentRankValue, "—");
  setText(elements.nextRankLabel, "—");
  setText(elements.nextRankDistance, "—");
  setText(elements.checkpointValue, "—");
  setText(elements.checkpointNote, "нет данных");
  setText(elements.lastSkillValue, "—");
  setText(elements.lastSkillNote, "нет данных");
  elements.cumulativeChart?.replaceChildren();
  elements.projectChart?.replaceChildren();
  elements.activityHeatmap.replaceChildren();
  elements.rankLadder?.replaceChildren();
  elements.forecastTable?.replaceChildren();
  elements.timelineRow?.replaceChildren();
  elements.technicalSkillGrid?.replaceChildren();
  elements.technologySkillGrid?.replaceChildren();
  elements.skillBreakdown?.replaceChildren();
  if (elements.levelRing) {
    elements.levelRing.style.background = "conic-gradient(var(--blue) 0%, var(--grid) 0)";
  }
}

export function renderDashboard(user, transactions, details = null) {
  const model = buildModel(user, transactions, details);
  currentModel = model;
  projectListLimit = PROJECT_LIST_STEP;
  const initials = getInitials(user.login);
  const firstName = getDisplayFirstName(user);
  const displayName = user.fullName || model.insights.eventUser?.name || user.login;
  const latest = model.latest;
  const latestProject = latest ? getProjectName(latest) : "Нет проекта";
  const latestXp = latest ? `${latest.amount >= 0 ? "+" : ""}${formatExactNumber(latest.amount)} XP` : "Нет данных";
  const latestDate = latest ? formatDate(latest.date) : "Нет даты";
  const auditMeta = getAuditMeta(user.auditRatio);
  const auditPercentages = calculateAuditPercentages(user.totalUp, user.totalDown);
  const insights = {
    ...model.insights,
    heatmapActiveDays: model.heatmap.activeDays,
  };
  const currentTimeline = insights.timelineCurrent;
  const campusLabel = formatCampusLabel(user.campus || insights.campus);
  const snapshotStudent = getCurrentSnapshotStudent(model);
  const batchLabel = formatBatchLabel(insights.batch || snapshotStudent?.batch);
  const snapshotAvatar = snapshotStudent?.avatar || getSnapshotAvatar(model);

  setText(elements.headerAvatar, initials);
  if (elements.headerAvatar) {
    elements.headerAvatar.style.background = snapshotAvatar || "";
  }
  setText(elements.profileFirstName, firstName);
  setText(elements.profileHandle, `@${user.login}`);
  setText(elements.profileUserId, `#${user.id}`);
  const rankName = insights.currentRank?.name ?? "—";
  setText(elements.profileRankPill, rankName);
  setText(
    elements.levelNextLabel,
    insights.nextRank && Number.isFinite(insights.level)
      ? `${formatLevelDistance(insights.nextRank, insights.level)} до следующего ранга`
      : insights.currentRank
        ? "максимальный ранг"
        : "—",
  );
  setText(
    elements.levelNextNote,
    insights.nextRank ? `след. ранг ${insights.nextRank.name}` : insights.currentRank ? "ранги завершены" : "нет данных",
  );
  setText(elements.levelValue, Number.isFinite(insights.level) ? String(insights.level) : "—");
  setText(elements.statTotalXp, formatXp(model.totalXp));
  setText(elements.statTotalXpRaw, formatRawXp(model.totalXp));
  setText(elements.statProjectsPassed, insights.hasProgressData ? String(insights.doneProgressCount) : "—");
  setText(
    elements.statProjectsNote,
    insights.hasProgressData ? `${formatInteger(insights.recentDoneProgressCount)} за 7 дней` : "—",
  );
  setText(elements.statAuditRatio, formatNumber(user.auditRatio));
  setText(elements.auditBigRatio, formatNumber(user.auditRatio));
  setText(elements.auditBalanceLabel, auditMeta.status.toLowerCase());
  setText(elements.statLatestXp, latestXp);
  setText(elements.statLatestProject, latestProject);
  setText(elements.statLatestDate, latestDate);
  setText(elements.auditStatusText, auditMeta.status);
  setText(elements.auditStatusNote, auditMeta.note);
  setText(elements.auditUpValue, formatXp(user.totalUp));
  setText(elements.auditDownValue, formatXp(user.totalDown));
  setText(elements.infoLogin, user.login);
  setText(elements.infoId, `#${user.id}`);
  setText(elements.profileCampus, campusLabel || "—");
  setText(elements.profileCohort, batchLabel || "—");
  setText(elements.activitySummary, `${model.heatmap.activeDays} активных дней · ${model.heatmap.weeks} недель // ${model.heatmap.period}`);
  setText(elements.radialRatio, formatNumber(user.auditRatio));
  setText(elements.publicAvatar, initials);
  if (elements.publicAvatar) {
    elements.publicAvatar.style.background = snapshotAvatar || "";
  }
  setText(elements.publicName, displayName);
  setText(elements.publicHandle, `@${user.login}`);
  setText(elements.publicMeta, `· Поток ${batchLabel || "—"}`);
  setText(elements.publicAvailability, "Доступен");
  setText(elements.publicLevel, Number.isFinite(insights.level) ? String(insights.level) : "—");
  setText(elements.publicTotalXp, formatExactNumber(model.totalXp));
  setText(elements.publicAuditRatio, formatNumber(user.auditRatio));
  elements.publicAuditRatio?.closest(".public-audit-ratio")?.style.setProperty("--audit-color", auditMeta.color);
  setText(elements.currentRankValue, rankName);
  setText(elements.nextRankLabel, insights.nextRank ? `до ранга ${insights.nextRank.name}` : insights.currentRank ? "ранги завершены" : "—");
  setText(elements.nextRankDistance, insights.nextRank && Number.isFinite(insights.level) ? formatLevelDistance(insights.nextRank, insights.level) : "—");
  setText(elements.checkpointValue, "—");
  setText(elements.checkpointNote, "нет подтверждённых данных");
  setText(elements.lastSkillValue, insights.latestSkill);
  setText(
    elements.lastSkillNote,
    insights.latestCompleted?.object?.name
      ? `${insights.latestCompleted.object.name} · ${formatDate(insights.latestCompleted.updatedDate)}`
      : "по последнему завершённому объекту",
  );

  elements.auditCard.style.setProperty("--audit-color", auditMeta.color);
  elements.auditCard.style.setProperty("--audit-tint", auditMeta.tint);
  elements.auditUpBar.style.width = `${auditPercentages.upPercent}%`;
  elements.auditDownBar.style.width = `${auditPercentages.downPercent}%`;
  if (elements.nextRankProgress) {
    elements.nextRankProgress.style.width = `${insights.rankProgress ?? 0}%`;
  }
  if (elements.progressWarning) {
    const icon = elements.progressWarning.querySelector("span");
    const strong = elements.progressWarning.querySelector("strong");
    if (icon) {
      icon.textContent = currentTimeline ? (insights.isBehindTimeline ? "⚠" : "✓") : "i";
    }
    if (strong) {
      strong.textContent = Number.isFinite(insights.level) && insights.isBehindTimeline && currentTimeline
        ? `Текущий уровень (${insights.level}) ниже минимально ожидаемого (${currentTimeline.minLevel}) для ${currentTimeline.label}.`
        : currentTimeline && Number.isFinite(insights.level)
          ? `Текущий уровень (${insights.level}) соответствует timeline для ${currentTimeline.label}.`
          : insights.timelineRows.length > 0
            ? "Timeline metadata доступна; подтверждённая дата старта программы отсутствует."
            : "Нет подтверждённых данных timeline.";
    }
  }

  const liveTargets = [
    user.campus ? elements.profileCampus : null,
    insights.batch ? elements.profileCohort : null,
    insights.batch ? elements.publicMeta : null,
  ];

  if (insights.hasProgressData) {
    liveTargets.push(elements.statProjectsPassed, elements.lastSkillValue);
  }

  if (insights.hasLiveLevel) {
    liveTargets.push(
      elements.profileRankPill,
      elements.levelNextLabel,
      elements.currentRankCard,
      elements.publicLevel,
    );
  }

  if (elements.progressWarning) {
    liveTargets.push(elements.progressWarning);
  }

  clearPlaceholderAncestors(
    ...liveTargets,
  );

  if (insights.hasLiveLevel) {
    markSnapshot(
      insights.rankSnapshotMeta,
      elements.profileRankPill,
      elements.levelNextLabel?.closest(".level-wrap"),
      elements.currentRankCard,
    );
  }

  markSnapshot(insights.timelineSnapshotMeta, elements.progressWarning);

  if (insights.hasProgressData) {
    markSnapshot(
      insights.latestSkillSnapshotMeta,
      elements.lastSkillValue?.closest(".stat-card, .compact-card"),
    );
  }

  renderActivityHeatmap(elements.activityHeatmap, model.heatmap);
  renderProjectXpList(model.projects);
  renderRankLadder(insights);
  renderForecast(insights);
  renderTimeline(insights);
  if (insights.hasProgressData || insights.skillsSnapshotMeta) {
    renderSkillGrid(elements.technicalSkillGrid, insights.technicalSkills, insights.skillsSnapshotMeta);
    renderSkillGrid(elements.technologySkillGrid, insights.technologySkills, insights.skillsSnapshotMeta);
  }
  renderTeamwork(user, insights);
  renderDashboardCharts(model);

  maybeRunProfileCountUp(model);
}

export function initializeUi({ onLogin, onLogout }) {
  elements.loginForm.addEventListener("submit", onLogin);
  elements.logoutButton.addEventListener("click", onLogout);
  elements.tabs.forEach(bindTabButton);

  document.querySelectorAll("[data-tab-link]").forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tabLink);
      document.querySelector(`#panel-${button.dataset.tabLink}`)?.focus();
    });
  });

  elements.histogramBins.addEventListener("input", () => {
    renderDistribution();
  });

  elements.distributionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      distributionMode = button.dataset.distributionMode;
      renderDistribution();
    });
  });

  elements.comparePeriod?.addEventListener("change", () => {
    comparePeriod = elements.comparePeriod.value;
    renderDashboardCharts(currentModel);
  });

  elements.comparePopulation?.addEventListener("change", () => {
    comparePopulation = elements.comparePopulation.value;
    renderDashboardCharts(currentModel);
  });

  elements.projectListMore?.addEventListener("click", () => {
    const totalRows = currentModel?.projects?.length ?? 0;
    projectListLimit = Math.min(totalRows, projectListLimit + PROJECT_LIST_STEP);
    renderProjectXpList();
  });

  elements.projectListAll?.addEventListener("click", () => {
    projectListLimit = currentModel?.projects?.length ?? PROJECT_LIST_STEP;
    renderProjectXpList();
  });

  elements.boardFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      boardFilter = button.dataset.boardFilter;
      renderLeaderboard();
    });
  });

  elements.boardSearchInput?.addEventListener("input", () => {
    boardSearchQuery = elements.boardSearchInput.value;
    renderLeaderboard();
  });

  elements.publicRadarButtons.forEach((button) => {
    button.addEventListener("click", () => {
      publicRadarMode = button.dataset.publicRadar;
      renderPublicRadar();
    });
  });

  setActiveTab("profile");
  renderDashboardCharts();
}
