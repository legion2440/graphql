import {
  renderActivityHeatmap,
  renderAuditRadial,
  renderCompareChart,
  renderCumulativeXpChart,
  renderDistributionHistogram,
  renderRadarChart,
  renderXpByProjectChart,
} from "./charts.js?v=20260628-live-data8";
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
} from "./data.js?v=20260628-live-data8";
import {
  LEADERBOARD_SNAPSHOT,
  LEADERBOARD_SNAPSHOT_META,
} from "./leaderboard-snapshot.js?v=20260628-live-data8";

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
  auditRadial: document.querySelector("#audit-radial"),
  radialRatio: document.querySelector("#radial-ratio"),
  statsSkillsRadar: document.querySelector("#stats-skills-radar"),
  compareChart: document.querySelector("#compare-chart"),
  distributionChart: document.querySelector("#distribution-chart"),
  histogramBins: document.querySelector("#histogram-bins"),
  histogramBinsLabel: document.querySelector("#histogram-bins-label"),
  distributionButtons: [...document.querySelectorAll("[data-distribution-mode]")],
  techRadar: document.querySelector("#tech-radar"),
  technologyRadar: document.querySelector("#technology-radar"),
  boardFilterButtons: [...document.querySelectorAll("[data-board-filter]")],
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
  loginPreviewXp: document.querySelector("#login-preview-xp"),
  loginPreviewProjects: document.querySelector("#login-preview-projects"),
  loginPreviewRatio: document.querySelector("#login-preview-ratio"),
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
let boardFilter = "all";
let publicRadarMode = "top";

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

function renderSkillCard(skill, snapshotMeta = null) {
  const card = createEl("article", "skill-card ts-card");
  const top = createEl("div");
  top.append(createEl("strong", "", skill.label), createEl("span", "", `${skill.completed}/${skill.total}`));
  const tier = createEl("em", "tier-none", "—");
  tier.setAttribute("data-placeholder", "");
  tier.setAttribute("tabindex", "0");
  tier.setAttribute("aria-label", getPlaceholderTooltipText(snapshotMeta));
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

function renderTeamwork(user, insights) {
  if (!insights.hasGroupsData) {
    if (elements.teamTags) {
      elements.teamTags.replaceChildren();
      const item = createEl("div");
      item.append(createEl("span", "", "—"), createEl("strong", "", "Нет подтверждённых данных"), createEl("small", "", "optional groups/audits query unavailable"));
      elements.teamTags.append(item);
    }
    if (elements.teamRank) {
      elements.teamRank.replaceChildren(createEl("p", "", "Нет подтверждённых данных по группам."));
    }
    if (elements.friendGrid) {
      elements.friendGrid.replaceChildren(createEl("p", "", "Нет подтверждённых данных по группам и аудитам."));
    }
    return;
  }

  markLive(
    elements.teamTags?.closest("[data-placeholder]"),
    elements.teamRank?.closest("[data-placeholder]"),
    elements.friendGrid?.closest("[data-placeholder]"),
  );

  if (elements.teamTags) {
    elements.teamTags.replaceChildren();
    const tags = [
      ["🤝", "Группы", `${formatInteger(insights.uniqueProjectCount)} groupId`],
      ["⚖", "Аудиты", `${formatInteger(insights.auditCount)} audit records`],
      ["⚡", "Активность", `${formatInteger(insights.heatmapActiveDays ?? 0)} активных дней`],
    ];
    for (const [icon, title, note] of tags) {
      const item = createEl("div");
      item.append(createEl("span", "", icon), createEl("strong", "", title), createEl("small", "", note));
      elements.teamTags.append(item);
    }
  }

  if (elements.teamRank) {
    const captainCount = insights.uniquePartnerCount;
    elements.teamRank.replaceChildren();
    const title = createEl("div", "team-rank-title");
    title.append(
      createEl("span", "team-rank-emoji", "🤝"),
      (() => {
        const wrap = createEl("div");
        wrap.append(
          createEl("strong", "", "Капитаны групп"),
          createEl("span", "", "unique group.captainId из доступных group_user rows"),
        );
        return wrap;
      })(),
    );
    const score = createEl("div", "team-rank-score");
    score.append(createEl("b", "", formatInteger(captainCount)), createEl("span", "", "капитанов"));
    const bar = createEl("i");
    const fill = createEl("span", "ts-fill");
    fill.style.width = "0%";
    bar.append(fill);
    elements.teamRank.append(title, score, bar, createEl("p", "", "Полный список участников групп API не подтверждён."));
  }

  if (elements.friendGrid) {
    elements.friendGrid.replaceChildren();
    const active = createEl("div");
    active.append(createEl("h4", "", "АКТИВНЫЕ ПРОЕКТЫ"));
    for (const group of insights.activeGroups.slice(0, 4)) {
      const row = createEl("p");
      row.append(
        createEl("i", "", getInitials(group.group?.object?.name || group.path)),
        (() => {
          const wrap = createEl("span");
          wrap.append(
            document.createTextNode(group.group?.object?.name || getObjectNameFromPath(group.path)),
            createEl("small", "", group.path),
          );
          return wrap;
        })(),
        createEl("b", "", formatProjectStatus(group.group?.status)),
      );
      active.append(row);
    }
    const audits = createEl("div");
    audits.append(createEl("h4", "", "ПОСЛЕДНИЕ АУДИТЫ"));
    for (const audit of insights.recentAudits.slice(0, 4)) {
      const row = createEl("p");
      row.append(
        createEl("i", "", "AU"),
        (() => {
          const wrap = createEl("span");
          wrap.append(document.createTextNode(`group #${audit.groupId}`), createEl("small", "", audit.updatedAt || audit.createdAt || "—"));
          return wrap;
        })(),
        createEl("b", "", audit.closureType || "—"),
      );
      audits.append(row);
    }
    elements.friendGrid.append(active, audits);
  }
}

function maybeRunProfileCountUp(model) {
  if (profileCountUpDone || activeTab !== "profile") {
    return;
  }

  profileCountUpDone = true;
  animateNumber(elements.statTotalXp, model.totalXp, formatExactNumber, 0);
  animateNumber(elements.statAuditRatio, model.user.auditRatio, formatNumber, 2);
  if (Number.isFinite(model.insights.level)) {
    animateNumber(elements.levelValue, model.insights.level, String, 0);
  }
  if (model.insights.hasProgressData) {
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

function buildCompareData(model) {
  return null;
}

function renderDashboardCharts(model = null) {
  if (!model) {
    if (!renderedStaticCharts.has("radars")) {
      renderRadarChart(elements.statsSkillsRadar, publicRadarData.top, "Skills radar");
      renderRadarChart(elements.techRadar, publicRadarData.top, "Technical skills radar");
      renderRadarChart(elements.technologyRadar, publicRadarData.all, "Technologies radar");
      renderCompareChart(elements.compareChart, null);
      renderedStaticCharts.add("radars");
    }
    renderDistribution();
    renderLeaderboard();
    renderPublicRadar();
    return;
  }

  const topAxes = radarAxes(model.insights.topSkills, 8);
  const techAxes = radarAxes(model.insights.technicalSkills, 9);
  const technologyAxes = radarAxes(model.insights.technologySkills, 8);

  renderRadarChart(elements.statsSkillsRadar, topAxes, "Live skills radar");
  renderRadarChart(elements.techRadar, techAxes, "Live technical skills radar");
  renderRadarChart(elements.technologyRadar, technologyAxes, "Live technologies radar");
  renderCompareChart(elements.compareChart, buildCompareData(model));
  if (model.insights.hasProgressData) {
    markLive(
      elements.statsSkillsRadar?.closest("[data-placeholder]"),
      elements.techRadar?.closest("[data-placeholder]"),
      elements.technologyRadar?.closest("[data-placeholder]"),
    );
    markSnapshot(
      model.insights.skillsSnapshotMeta,
      elements.statsSkillsRadar?.closest(".wide-card"),
      elements.techRadar?.closest(".wide-card"),
      elements.technologyRadar?.closest(".wide-card"),
    );
  }
  if (elements.compareLegend) {
    elements.compareLegend.replaceChildren(createEl("span", "", "нет подтверждённой исторической серии"));
  }
  renderDistribution(model);
  renderLeaderboard();
  renderPublicRadar(model);
}

function renderDistribution(model = currentModel) {
  if (!elements.distributionChart || !elements.histogramBins) {
    return;
  }

  const bins = Number(elements.histogramBins.value);
  const currentSnapshotStudent = model
    ? leaderboardStudents.find((student) => student.login.toLowerCase() === model.user.login.toLowerCase())
    : null;
  const currentBatch = model?.insights?.batch || currentSnapshotStudent?.batch || "";
  const batchButton = elements.distributionButtons.find((button) => button.dataset.distributionMode === "batch");
  if (batchButton) {
    batchButton.textContent = currentBatch || "Batch";
  }
  const values =
    distributionMode === "batch"
      ? leaderboardStudents.filter((student) => student.batch === currentBatch).map((student) => student.xp)
      : leaderboardStudents.map((student) => student.xp);
  const markerValue =
    currentSnapshotStudent && Number(currentSnapshotStudent.xp) === Number(model?.totalXp)
      ? model.totalXp
      : null;
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
  const source =
    model && publicRadarMode === "all"
      ? model.insights.technologySkills
      : model?.insights?.topSkills ?? publicRadarData[publicRadarMode];
  const axes = Array.isArray(source) && source[0]?.value !== undefined ? radarAxes(source, publicRadarMode === "all" ? 10 : 8) : source;
  renderRadarChart(elements.publicRadar, axes, "Public skills radar");
  if (model) {
    markLive(elements.publicRadar.closest("[data-placeholder]") ?? elements.publicRadar.closest(".radar-card"));
    markSnapshot(model.insights.skillsSnapshotMeta, elements.publicRadar.closest(".radar-card"));
  }
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

function renderLeaderboard() {
  if (!elements.leaderboardRows) {
    return;
  }

  const currentLogin = currentModel?.user?.login?.toLowerCase() ?? "";
  const sorted = [...leaderboardStudents].sort((left, right) => left.rank - right.rank || right.xp - left.xp);
  const filtered = boardFilter === "all" ? sorted : sorted.filter((student) => student.batch === boardFilter);
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

export function resetLoginPreview() {
  setText(elements.loginPreviewXp, "—");
  setText(elements.loginPreviewProjects, "—");
  setText(elements.loginPreviewRatio, "—");
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
  setText(elements.publicMeta, "· —");
  setText(elements.publicAvailability, "—");
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
  elements.cumulativeChart.replaceChildren();
  elements.projectChart.replaceChildren();
  elements.activityHeatmap.replaceChildren();
  elements.auditRadial.replaceChildren();
  elements.rankLadder?.replaceChildren();
  elements.forecastTable?.replaceChildren();
  elements.timelineRow?.replaceChildren();
  elements.technicalSkillGrid?.replaceChildren();
  elements.technologySkillGrid?.replaceChildren();
  elements.skillBreakdown?.replaceChildren();
  if (elements.levelRing) {
    elements.levelRing.style.background = "conic-gradient(var(--blue) 0%, var(--grid) 0)";
  }
  resetLoginPreview();
}

export function renderDashboard(user, transactions, details = null) {
  const model = buildModel(user, transactions, details);
  currentModel = model;
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

  setText(elements.headerAvatar, initials);
  setText(elements.profileFirstName, firstName);
  setText(elements.profileHandle, `@${user.login}`);
  setText(elements.profileUserId, `#${user.id}`);
  const rankName = insights.currentRank?.name ?? "—";
  setText(elements.profileRankPill, rankName);
  setText(elements.levelNextLabel, insights.nextRank ? `до ${insights.nextRank.name}` : insights.currentRank ? "максимальный ранг" : "—");
  setText(elements.levelNextNote, insights.nextRank && Number.isFinite(insights.level) ? `${formatLevelDistance(insights.nextRank, insights.level)} до следующего ранга` : "нет данных");
  setText(elements.levelValue, Number.isFinite(insights.level) ? String(insights.level) : "—");
  setText(elements.statTotalXp, formatExactNumber(model.totalXp));
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
  setText(elements.profileCampus, user.campus || insights.campus || "—");
  setText(elements.profileCohort, insights.batch || "—");
  setText(elements.activitySummary, `${model.heatmap.activeDays} активных дней · ${model.heatmap.weeks} недель · ${model.heatmap.period}`);
  setText(elements.radialRatio, formatNumber(user.auditRatio));
  setText(elements.publicAvatar, initials);
  setText(elements.publicName, displayName);
  setText(elements.publicHandle, `@${user.login}`);
  setText(elements.publicMeta, `· ${insights.batch || "—"} · ${user.campus || insights.campus || "—"}`);
  setText(elements.publicAvailability, "—");
  setText(elements.publicLevel, Number.isFinite(insights.level) ? String(insights.level) : "—");
  setText(elements.publicTotalXp, formatExactNumber(model.totalXp));
  setText(elements.publicAuditRatio, formatNumber(user.auditRatio));
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
    user.campus || insights.batch ? elements.publicMeta : null,
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
      insights.skillsSnapshotMeta,
      elements.lastSkillValue?.closest(".compact-card"),
    );
  }

  renderActivityHeatmap(elements.activityHeatmap, model.heatmap);
  renderCumulativeXpChart(elements.cumulativeChart, model.cumulativeXp, getProjectName);
  renderXpByProjectChart(elements.projectChart, model.projects);
  renderAuditRadial(elements.auditRadial, user.totalUp, user.totalDown);
  renderRankLadder(insights);
  renderForecast(insights);
  renderTimeline(insights);
  if (insights.hasProgressData) {
    renderSkillGrid(elements.technicalSkillGrid, insights.technicalSkills, insights.skillsSnapshotMeta);
    renderSkillGrid(elements.technologySkillGrid, insights.technologySkills, insights.skillsSnapshotMeta);
    renderSkillBreakdown(insights.topSkills);
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

  elements.boardFilterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      boardFilter = button.dataset.boardFilter;
      renderLeaderboard();
    });
  });

  elements.publicRadarButtons.forEach((button) => {
    button.addEventListener("click", () => {
      publicRadarMode = button.dataset.publicRadar;
      renderPublicRadar();
    });
  });

  setActiveTab("profile");
  resetLoginPreview();
  renderDashboardCharts();
}
