import { clearToken, getToken, logout, signIn, storeToken } from "./auth.js";
import { renderCumulativeXpChart, renderXpByProjectChart } from "./charts.js";
import {
  calculateCumulativeXp,
  calculateTotalXp,
  getLastXpTransaction,
  getProjectName,
  groupXpByProject,
  normalizeTransactions,
  normalizeUser,
} from "./data.js";
import { graphqlRequest } from "./graphql.js";
import {
  PROFILE_QUERY,
  XP_TRANSACTIONS_QUERY,
  XP_TRANSACTIONS_VARIABLES,
} from "./queries.js";

const elements = {
  loginView: document.querySelector("#login-view"),
  profileView: document.querySelector("#profile-view"),
  loginForm: document.querySelector("#login-form"),
  identifier: document.querySelector("#identifier"),
  password: document.querySelector("#password"),
  loginButton: document.querySelector("#login-button"),
  loginError: document.querySelector("#login-error"),
  logoutButton: document.querySelector("#logout-button"),
  profileStatus: document.querySelector("#profile-status"),
  headerLogin: document.querySelector("#header-login"),
  profileLogin: document.querySelector("#profile-login"),
  profileId: document.querySelector("#profile-id"),
  totalXp: document.querySelector("#total-xp"),
  projectCount: document.querySelector("#project-count"),
  lastXp: document.querySelector("#last-xp"),
  lastXpDate: document.querySelector("#last-xp-date"),
  auditRatio: document.querySelector("#audit-ratio"),
  totalUp: document.querySelector("#total-up"),
  totalDown: document.querySelector("#total-down"),
  cumulativeChart: document.querySelector("#cumulative-chart"),
  projectChart: document.querySelector("#project-chart"),
};

const state = {
  user: null,
  transactions: [],
};

const numberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

function formatDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime())
    ? dateFormatter.format(date)
    : "Date unavailable";
}

function resetProfileState() {
  state.user = null;
  state.transactions = [];
  elements.headerLogin.textContent = "";
  elements.profileStatus.textContent = "";
  elements.profileStatus.removeAttribute("data-state");
  elements.cumulativeChart.replaceChildren();
  elements.projectChart.replaceChildren();
}

function setLoginLoading(isLoading) {
  elements.loginButton.disabled = isLoading;
  elements.identifier.disabled = isLoading;
  elements.password.disabled = isLoading;
  elements.loginButton.textContent = isLoading ? "Signing in…" : "Sign in";
}

function showLogin(message = "") {
  elements.profileView.hidden = true;
  elements.loginView.hidden = false;
  elements.loginError.textContent = message;
  setLoginLoading(false);

  if (!message) {
    elements.identifier.focus();
  }
}

function showProfileLoading() {
  elements.loginView.hidden = true;
  elements.profileView.hidden = false;
  elements.profileStatus.textContent = "Loading profile…";
  elements.profileStatus.removeAttribute("data-state");
}

function getErrorMessage(error) {
  switch (error?.name) {
    case "ConfigurationError":
      return error.message;
    case "ExpiredSessionError":
      return "Your session has expired. Please sign in again.";
    case "NetworkError":
      return error.message;
    case "GraphQLRequestError":
      return `GraphQL error: ${error.message}`;
    case "AuthenticationError":
      return error.message;
    default:
      return error?.message || "An unexpected error occurred.";
  }
}

function renderProfile() {
  const user = state.user;
  const transactions = state.transactions;
  const totalXp = calculateTotalXp(transactions);
  const cumulativeXp = calculateCumulativeXp(transactions);
  const projects = groupXpByProject(transactions);
  const latest = getLastXpTransaction(transactions);

  elements.headerLogin.textContent = user.login;
  elements.profileLogin.textContent = user.login;
  elements.profileId.textContent = String(user.id);
  elements.totalXp.textContent = formatNumber(totalXp);
  elements.projectCount.textContent = String(projects.length);
  elements.lastXp.textContent = latest ? `${formatNumber(latest.amount)} XP` : "No data";
  elements.lastXpDate.textContent = latest ? formatDate(latest.date) : "No data";
  elements.auditRatio.textContent = formatNumber(user.auditRatio);
  elements.totalUp.textContent = formatNumber(user.totalUp);
  elements.totalDown.textContent = formatNumber(user.totalDown);

  renderCumulativeXpChart(elements.cumulativeChart, cumulativeXp, getProjectName);
  renderXpByProjectChart(elements.projectChart, projects);

  elements.profileStatus.textContent =
    transactions.length === 0 ? "No XP transactions were found for this user." : "";
  elements.profileStatus.removeAttribute("data-state");
  elements.loginView.hidden = true;
  elements.profileView.hidden = false;
}

async function loadProfile() {
  showProfileLoading();

  const [profileData, xpData] = await Promise.all([
    graphqlRequest(PROFILE_QUERY),
    graphqlRequest(XP_TRANSACTIONS_QUERY, XP_TRANSACTIONS_VARIABLES),
  ]);

  state.user = normalizeUser(profileData.user);
  state.transactions = normalizeTransactions(xpData.transaction);
  renderProfile();
}

async function handleLogin(event) {
  event.preventDefault();
  elements.loginError.textContent = "";

  const identifier = elements.identifier.value.trim();
  const password = elements.password.value;

  if (!identifier || !password) {
    elements.loginError.textContent = "Enter both your username/email and password.";
    return;
  }

  setLoginLoading(true);

  try {
    const token = await signIn(identifier, password);
    storeToken(token);
    elements.password.value = "";
    await loadProfile();
  } catch (error) {
    if (error?.name === "ExpiredSessionError") {
      clearToken();
    }

    resetProfileState();
    showLogin(getErrorMessage(error));
  }
}

function handleLogout() {
  logout();
  resetProfileState();
  elements.loginForm.reset();
  showLogin();
}

async function initialize() {
  elements.loginForm.addEventListener("submit", handleLogin);
  elements.logoutButton.addEventListener("click", handleLogout);

  if (!getToken()) {
    showLogin();
    return;
  }

  try {
    await loadProfile();
  } catch (error) {
    if (error?.name === "ExpiredSessionError") {
      clearToken();
    }

    resetProfileState();
    showLogin(getErrorMessage(error));
  }
}

initialize();
