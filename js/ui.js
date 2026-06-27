import {
  renderActivityHeatmap,
  renderAuditRadial,
  renderCompareChart,
  renderCumulativeXpChart,
  renderDistributionHistogram,
  renderRadarChart,
  renderXpByProjectChart,
} from "./charts.js";
import {
  buildActivityHeatmapData,
  calculateAuditPercentages,
  calculateCumulativeXp,
  calculateTotalXp,
  formatDate,
  formatNumber,
  formatRawXp,
  formatXp,
  getAuditMeta,
  getFirstName,
  getInitials,
  getLastXpTransaction,
  getProjectName,
  groupXpByProject,
} from "./data.js";

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
  statTotalXp: document.querySelector("#stat-total-xp"),
  statTotalXpRaw: document.querySelector("#stat-total-xp-raw"),
  statAuditRatio: document.querySelector("#stat-audit-ratio"),
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
  techRadar: document.querySelector("#tech-radar"),
  technologyRadar: document.querySelector("#technology-radar"),
  publicRadar: document.querySelector("#public-radar"),
  publicAvatar: document.querySelector("#public-avatar"),
  publicName: document.querySelector("#public-name"),
  publicHandle: document.querySelector("#public-handle"),
  publicTotalXp: document.querySelector("#public-total-xp"),
  publicAuditRatio: document.querySelector("#public-audit-ratio"),
  loginPreviewXp: document.querySelector("#login-preview-xp"),
  loginPreviewProjects: document.querySelector("#login-preview-projects"),
  loginPreviewRatio: document.querySelector("#login-preview-ratio"),
};

const loadingStageContent = {
  signinRequest: ["→", " POST /api/auth/signin ", "ожидание"],
  signinSuccess: ["→", " signin response ", "ожидание"],
  profileQuery: ["→", " query PROFILE_QUERY { user · audits } ", "ожидание"],
  xpQuery: ["→", " query XP_TRANSACTIONS_QUERY ($type) ", "ожидание"],
  normalization: ["→", " normalize profile + XP data ", "ожидание"],
  render: ["→", " render dashboard ", "ожидание"],
};

const renderedStaticCharts = new Set();
let activeTab = "profile";
let profileCountUpDone = false;
let publicCountUpDone = false;

function setText(element, value) {
  if (element) {
    element.textContent = value;
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

function maybeRunProfileCountUp(model) {
  if (profileCountUpDone || activeTab !== "profile") {
    return;
  }

  profileCountUpDone = true;
  animateNumber(elements.statTotalXp, model.totalXp, formatXp, 0);
  animateNumber(elements.statAuditRatio, model.user.auditRatio, formatNumber, 2);
  animateNumber(elements.auditBigRatio, model.user.auditRatio, formatNumber, 2);
}

function maybeRunPublicCountUp(model) {
  if (publicCountUpDone || activeTab !== "public") {
    return;
  }

  publicCountUpDone = true;
  animateNumber(elements.publicTotalXp, model.totalXp, formatXp, 0);
  animateNumber(elements.publicAuditRatio, model.user.auditRatio, formatNumber, 2);
}

function buildModel(user, transactions) {
  const totalXp = calculateTotalXp(transactions);
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
  };
}

function renderPlaceholderCharts() {
  if (!renderedStaticCharts.has("radars")) {
    renderRadarChart(
      elements.statsSkillsRadar,
      [
        { label: "Go", value: 88 },
        { label: "JS", value: 78 },
        { label: "Rust", value: 54 },
        { label: "Algo", value: 70 },
        { label: "SQL", value: 62 },
        { label: "CSS", value: 82 },
      ],
      "Placeholder skills radar",
    );
    renderRadarChart(
      elements.techRadar,
      [
        { label: "Prog", value: 95 },
        { label: "Algo", value: 50 },
        { label: "Devops", value: 30 },
        { label: "Front", value: 45 },
        { label: "Back", value: 60 },
        { label: "Stats", value: 100 },
        { label: "AI", value: 20 },
        { label: "Game", value: 20 },
        { label: "Tcp", value: 16 },
      ],
      "Placeholder technical skills radar",
    );
    renderRadarChart(
      elements.technologyRadar,
      [
        { label: "Go", value: 86 },
        { label: "Js", value: 43 },
        { label: "Html", value: 75 },
        { label: "Css", value: 50 },
        { label: "Unix", value: 17 },
        { label: "Docker", value: 15 },
        { label: "Sql", value: 33 },
        { label: "Git", value: 100 },
      ],
      "Placeholder technologies radar",
    );
    renderRadarChart(
      elements.publicRadar,
      [
        { label: "Go", value: 88 },
        { label: "Algo", value: 82 },
        { label: "Back", value: 78 },
        { label: "SQL", value: 74 },
        { label: "Front", value: 70 },
        { label: "Git", value: 86 },
      ],
      "Placeholder public skills radar",
    );
    renderCompareChart(elements.compareChart);
    renderDistributionHistogram(elements.distributionChart, Number(elements.histogramBins.value), "all");
    renderedStaticCharts.add("radars");
  }
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
  elements.loginError.textContent = message;
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
  publicCountUpDone = false;
  setText(elements.headerAvatar, "—");
  setText(elements.profileFirstName, "—");
  setText(elements.profileHandle, "@—");
  setText(elements.profileUserId, "#—");
  setText(elements.statTotalXp, "0 B");
  setText(elements.statTotalXpRaw, "0 bytes");
  setText(elements.statAuditRatio, "0");
  setText(elements.auditBigRatio, "0");
  setText(elements.statLatestXp, "Нет данных");
  setText(elements.statLatestProject, "Нет проекта");
  setText(elements.statLatestDate, "Нет даты");
  setText(elements.infoLogin, "—");
  setText(elements.infoId, "—");
  setText(elements.publicAvatar, "—");
  setText(elements.publicName, "—");
  setText(elements.publicHandle, "@—");
  setText(elements.publicTotalXp, "0 B");
  setText(elements.publicAuditRatio, "0");
  elements.cumulativeChart.replaceChildren();
  elements.projectChart.replaceChildren();
  elements.activityHeatmap.replaceChildren();
  elements.auditRadial.replaceChildren();
  resetLoginPreview();
}

export function renderDashboard(user, transactions) {
  const model = buildModel(user, transactions);
  const initials = getInitials(user.login);
  const firstName = getFirstName(user.login);
  const latest = model.latest;
  const latestProject = latest ? getProjectName(latest) : "Нет проекта";
  const latestXp = latest ? `${latest.amount >= 0 ? "+" : ""}${formatXp(latest.amount)}` : "Нет данных";
  const latestDate = latest ? formatDate(latest.date) : "Нет даты";
  const auditMeta = getAuditMeta(user.auditRatio);
  const auditPercentages = calculateAuditPercentages(user.totalUp, user.totalDown);

  setText(elements.headerAvatar, initials);
  setText(elements.profileFirstName, firstName);
  setText(elements.profileHandle, `@${user.login}`);
  setText(elements.profileUserId, `#${user.id}`);
  setText(elements.statTotalXp, formatXp(model.totalXp));
  setText(elements.statTotalXpRaw, formatRawXp(model.totalXp));
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
  setText(elements.infoId, String(user.id));
  setText(elements.activitySummary, `${model.heatmap.activeDays} активных дней · ${model.heatmap.weeks} недель · ${model.heatmap.period}`);
  setText(elements.radialRatio, formatNumber(user.auditRatio));
  setText(elements.publicAvatar, initials);
  setText(elements.publicName, user.login);
  setText(elements.publicHandle, `@${user.login}`);
  setText(elements.publicTotalXp, formatXp(model.totalXp));
  setText(elements.publicAuditRatio, formatNumber(user.auditRatio));

  elements.auditCard.style.setProperty("--audit-color", auditMeta.color);
  elements.auditCard.style.setProperty("--audit-tint", auditMeta.tint);
  elements.auditUpBar.style.width = `${auditPercentages.upPercent}%`;
  elements.auditDownBar.style.width = `${auditPercentages.downPercent}%`;

  renderActivityHeatmap(elements.activityHeatmap, model.heatmap);
  renderCumulativeXpChart(elements.cumulativeChart, model.cumulativeXp, getProjectName);
  renderXpByProjectChart(elements.projectChart, model.projects);
  renderAuditRadial(elements.auditRadial, user.totalUp, user.totalDown);
  renderPlaceholderCharts();

  maybeRunProfileCountUp(model);
  maybeRunPublicCountUp(model);
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
    const value = Number(elements.histogramBins.value);
    setText(elements.histogramBinsLabel, String(value));
    renderDistributionHistogram(elements.distributionChart, value, "all");
  });

  document.querySelectorAll(".chip-row button, .segmented button").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.parentElement;
      group.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  setActiveTab("profile");
  resetLoginPreview();
  renderPlaceholderCharts();
}
