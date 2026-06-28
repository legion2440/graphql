import { clearToken, getToken, logout, signIn, storeToken } from "./auth.js";
import { normalizeProfileDetails, normalizeTransactions, normalizeUser } from "./data.js?v=20260628-live-data7";
import { graphqlRequest } from "./graphql.js";
import {
  PROFILE_CURRICULUM_QUERY,
  PROFILE_EVENT_QUERY,
  PROFILE_GROUPS_QUERY,
  PROFILE_PROGRESS_QUERY,
  PROFILE_QUERY,
  XP_TRANSACTIONS_QUERY,
  XP_TRANSACTIONS_VARIABLES,
} from "./queries.js?v=20260628-live-data7";
import { initTheme } from "./theme.js";
import { initUnderConstruction } from "./under-construction.js?v=20260628-live-data7";
import {
  elements,
  initializeUi,
  renderDashboard,
  resetDashboard,
  resetLoadingStages,
  setLoginError,
  setLoginLoading,
  setView,
  updateLoadingStage,
} from "./ui.js?v=20260628-live-data7";

const state = {
  isBusy: false,
  user: null,
  transactions: [],
  details: null,
  activeStage: null,
};

function getErrorMessage(error) {
  switch (error?.name) {
    case "ConfigurationError":
      return error.message;
    case "ExpiredSessionError":
      return "Сессия истекла. Войдите снова.";
    case "NetworkError":
      return error.message;
    case "GraphQLRequestError":
      return `GraphQL error: ${error.message}`;
    case "AuthenticationError":
      return error.message;
    default:
      return error?.message || "Произошла непредвиденная ошибка.";
  }
}

function markStage(key, stateName, status) {
  state.activeStage = key;
  updateLoadingStage(key, stateName, status);
}

async function fetchOptionalProfileDetails(userId) {
  const variables = {
    userId,
    eventId: XP_TRANSACTIONS_VARIABLES.eventId,
    type: XP_TRANSACTIONS_VARIABLES.type,
  };
  const eventVariables = {
    userId,
    eventId: XP_TRANSACTIONS_VARIABLES.eventId,
  };
  const optionalQueries = [
    ["event", PROFILE_EVENT_QUERY, variables],
    ["progress", PROFILE_PROGRESS_QUERY, eventVariables],
    ["groups", PROFILE_GROUPS_QUERY, eventVariables],
    ["curriculum", PROFILE_CURRICULUM_QUERY, {}],
  ];
  const settled = await Promise.allSettled(
    optionalQueries.map(([name, query, queryVariables]) =>
      graphqlRequest(query, queryVariables).then((data) => ({ name, data })),
    ),
  );
  const details = {};
  const loaded = {};

  settled.forEach((result, index) => {
    const [name] = optionalQueries[index];
    if (result.status === "fulfilled") {
      loaded[name] = true;
      Object.assign(details, result.value.data);
      return;
    }

    loaded[name] = false;
    console.warn(`Optional profile enrichment "${name}" failed.`, result.reason);
  });

  return {
    ...details,
    __loaded: loaded,
  };
}

function showLogin(message = "") {
  setView("login");
  setLoginError(message);
  setLoginLoading(false);

  if (!message) {
    elements.identifier.focus();
  }
}

function resetAuthenticatedState() {
  state.user = null;
  state.transactions = [];
  state.details = null;
  state.activeStage = null;
  resetDashboard();
}

async function loadAuthenticatedProfile({ restoredSession = false, resetStages = true } = {}) {
  setView("loading");
  if (resetStages) {
    resetLoadingStages({ restoredSession });
  }

  markStage("profileQuery", "active", "запрос");
  const profileData = await graphqlRequest(PROFILE_QUERY);
  state.user = normalizeUser(profileData.user);
  markStage("profileQuery", "done", "успешно");

  markStage("xpQuery", "active", "XP");
  const userId = Number(state.user.id);
  const xpData = await graphqlRequest(XP_TRANSACTIONS_QUERY, {
    ...XP_TRANSACTIONS_VARIABLES,
    userId,
  });
  markStage("xpQuery", "active", "доп. данные");
  const detailsData = await fetchOptionalProfileDetails(userId);
  markStage("xpQuery", "done", "успешно");

  markStage("normalization", "active", "обработка");
  state.transactions = normalizeTransactions(xpData.transaction);
  state.details = normalizeProfileDetails(detailsData);
  markStage("normalization", "done", "готово");

  markStage("render", "active", "отрисовка");
  renderDashboard(state.user, state.transactions, state.details);
  markStage("render", "done", "готово");
  state.activeStage = null;
  setView("dashboard");
}

async function handleLogin(event) {
  event.preventDefault();

  if (state.isBusy) {
    return;
  }

  const identifier = elements.identifier.value.trim();
  const password = elements.password.value;

  setLoginError("");

  if (!identifier || !password) {
    setLoginError("Введите логин/email и пароль платформы.");
    return;
  }

  state.isBusy = true;
  setLoginLoading(true);
  resetAuthenticatedState();
  setView("loading");
  resetLoadingStages({ restoredSession: false });

  try {
    markStage("signinRequest", "active", "запрос");
    const token = await signIn(identifier, password);
    markStage("signinRequest", "done", "отправлен");
    markStage("signinSuccess", "done", "200 OK");
    storeToken(token);
    elements.password.value = "";
    await loadAuthenticatedProfile({ restoredSession: false, resetStages: false });
  } catch (error) {
    if (state.activeStage) {
      updateLoadingStage(state.activeStage, "error", "ошибка");
    }

    if (error?.name === "ExpiredSessionError") {
      clearToken();
    }

    resetAuthenticatedState();
    showLogin(getErrorMessage(error));
  } finally {
    state.isBusy = false;
    setLoginLoading(false);
  }
}

function handleLogout() {
  logout();
  resetAuthenticatedState();
  elements.loginForm.reset();
  showLogin();
}

async function initialize() {
  initializeUi({ onLogin: handleLogin, onLogout: handleLogout });
  initTheme({
    root: elements.root,
    toggle: elements.themeToggle,
    label: elements.themeLabel,
  });
  initUnderConstruction(elements.root);

  if (!getToken()) {
    showLogin();
    return;
  }

  state.isBusy = true;

  try {
    await loadAuthenticatedProfile({ restoredSession: true });
  } catch (error) {
    if (state.activeStage) {
      updateLoadingStage(state.activeStage, "error", "ошибка");
    }

    if (error?.name === "ExpiredSessionError") {
      clearToken();
    }

    resetAuthenticatedState();
    showLogin(getErrorMessage(error));
  } finally {
    state.isBusy = false;
  }
}

initialize();
