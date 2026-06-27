import { clearToken, getToken, logout, signIn, storeToken } from "./auth.js";
import { normalizeTransactions, normalizeUser } from "./data.js";
import { graphqlRequest } from "./graphql.js";
import {
  PROFILE_QUERY,
  XP_TRANSACTIONS_QUERY,
  XP_TRANSACTIONS_VARIABLES,
} from "./queries.js";
import { initTheme } from "./theme.js";
import { initUnderConstruction } from "./under-construction.js";
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
} from "./ui.js";

const state = {
  isBusy: false,
  user: null,
  transactions: [],
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
  markStage("profileQuery", "done", "успешно");

  markStage("xpQuery", "active", "запрос");
  const xpData = await graphqlRequest(XP_TRANSACTIONS_QUERY, XP_TRANSACTIONS_VARIABLES);
  markStage("xpQuery", "done", "успешно");

  markStage("normalization", "active", "обработка");
  state.user = normalizeUser(profileData.user);
  state.transactions = normalizeTransactions(xpData.transaction);
  markStage("normalization", "done", "готово");

  markStage("render", "active", "отрисовка");
  renderDashboard(state.user, state.transactions);
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
