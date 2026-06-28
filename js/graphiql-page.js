import React from "react";
import { createRoot } from "react-dom/client";
import { GraphiQL } from "graphiql";
import "graphiql/setup-workers/esm.sh";
import { clearToken, getToken } from "./auth.js";
import { GRAPHQL_URL, assertApiConfigured } from "./config.js";

const THEME_KEY = "graphql-profile-theme";
const DEFAULT_THEME = "dark";
const DEFAULT_PRESET_ID = "normal-profile";

const PROFILE_QUERY = `query Profile {
  user {
    id
    login
    firstName
    lastName
    campus
    auditRatio
    totalUp
    totalDown
  }
}`;

const PRESETS = Object.freeze([
  {
    id: DEFAULT_PRESET_ID,
    label: "Normal query: профиль пользователя",
    query: PROFILE_QUERY,
    variables: "{}",
  },
  {
    id: "nested-xp-object",
    label: "Nested query: XP и объект проекта",
    query: `query RecentXpWithObjects {
  transaction(
    where: {
      type: { _eq: "xp" }
      eventId: { _eq: 96 }
    }
    order_by: { createdAt: desc }
    limit: 20
  ) {
    id
    amount
    createdAt
    path
    object {
      id
      name
      type
    }
  }
}`,
    variables: "{}",
  },
  {
    id: "xp-arguments",
    label: "Arguments query: фильтрация XP",
    query: `query XpByArguments(
  $type: String!
  $eventId: Int!
  $limit: Int!
) {
  transaction(
    where: {
      type: { _eq: $type }
      eventId: { _eq: $eventId }
    }
    order_by: { createdAt: desc }
    limit: $limit
  ) {
    id
    amount
    createdAt
    path
    objectId
  }
}`,
    variables: `{
  "type": "xp",
  "eventId": 96,
  "limit": 20
}`,
  },
]);

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function getPreset(id) {
  return PRESETS.find((preset) => preset.id === id) ?? PRESETS[0];
}

function createMemoryStorage() {
  const store = new Map();

  return {
    get length() {
      return store.size;
    },
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

async function parseJsonResponse(response) {
  try {
    return await response.json();
  } catch {
    return {
      errors: [
        {
          message: `GraphQL endpoint returned an invalid JSON response (HTTP ${response.status}).`,
        },
      ],
    };
  }
}

function extractLogin(payload) {
  const user = Array.isArray(payload?.data?.user) ? payload.data.user[0] : payload?.data?.user;
  const login = typeof user?.login === "string" ? user.login.trim() : "";

  return login || null;
}

async function fetchProfileLogin(onExpiredSession) {
  assertApiConfigured();

  const token = getToken();

  if (!token) {
    onExpiredSession();
    return null;
  }

  let response;

  try {
    response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: PROFILE_QUERY, variables: {} }),
    });
  } catch {
    return null;
  }

  if (response.status === 401) {
    clearToken();
    onExpiredSession();
    return null;
  }

  if (!response.ok) {
    return null;
  }

  return extractLogin(await parseJsonResponse(response));
}

function createFetcher(onExpiredSession) {
  return async function fetchGraphQL(graphQLParams) {
    try {
      assertApiConfigured();
    } catch {
      return {
        errors: [{ message: "GraphQL endpoint is not configured." }],
      };
    }

    const token = getToken();

    if (!token) {
      onExpiredSession();
      return {
        errors: [{ message: "Сессия истекла. Войдите снова." }],
      };
    }

    let response;

    try {
      response = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(graphQLParams),
      });
    } catch {
      return {
        errors: [{ message: "Не удалось подключиться к GraphQL endpoint." }],
      };
    }

    if (response.status === 401) {
      clearToken();
      onExpiredSession();
      return {
        errors: [{ message: "Сессия истекла. Войдите снова." }],
      };
    }

    return parseJsonResponse(response);
  };
}

function AuthGate({ state }) {
  const isExpired = state === "expired";

  return React.createElement(
    "main",
    { className: "auth-gate" },
    React.createElement(
      "section",
      {
        className: "auth-panel",
        "data-state": state,
        "aria-labelledby": "auth-gate-title",
      },
      React.createElement(
        "h2",
        { id: "auth-gate-title" },
        isExpired ? "Сессия истекла" : "Требуется вход",
      ),
      React.createElement(
        "p",
        null,
        isExpired
          ? "Сессия истекла. Войдите снова."
          : "Для работы с GraphiQL необходимо войти в профиль.",
      ),
      React.createElement("a", { className: "login-link", href: "./index.html" }, "Перейти ко входу"),
    ),
  );
}

function Topbar({ authLabel, activePresetId, onPresetChange, showPresets }) {
  return React.createElement(
    "header",
    { className: "graphiql-topbar" },
    React.createElement(
      "div",
      { className: "graphiql-title" },
      React.createElement("h1", null, "Tomorrow School GraphiQL"),
      React.createElement("span", { className: "auth-status" }, authLabel),
    ),
    React.createElement(
      "div",
      { className: "graphiql-actions" },
      showPresets
        ? React.createElement(
            "label",
            { className: "preset-field", htmlFor: "preset-select" },
            "Запрос:",
            React.createElement(
              "select",
              {
                id: "preset-select",
                value: activePresetId,
                onChange: onPresetChange,
              },
              PRESETS.map((preset) =>
                React.createElement(
                  "option",
                  {
                    key: preset.id,
                    value: preset.id,
                  },
                  preset.label,
                ),
              ),
            ),
          )
        : null,
      React.createElement("a", { className: "profile-link", href: "./index.html" }, "← Вернуться в профиль"),
    ),
  );
}

function GraphiQLWorkspace({ preset, editorKey, fetcher, theme }) {
  const storage = React.useMemo(createMemoryStorage, [editorKey]);

  return React.createElement(
    "main",
    { className: "graphiql-workspace" },
    React.createElement(
      "div",
      { className: "graphiql-editor" },
      React.createElement(GraphiQL, {
        key: editorKey,
        fetcher,
        forcedTheme: theme,
        initialQuery: preset.query,
        initialVariables: preset.variables,
        defaultEditorToolsVisibility: "variables",
        isHeadersEditorEnabled: false,
        shouldPersistHeaders: false,
        showPersistHeadersSettings: false,
        storage,
      }),
    ),
  );
}

function App() {
  const initialTheme = readTheme();
  const [theme] = React.useState(initialTheme);
  const [authState, setAuthState] = React.useState(() => (getToken() ? "ready" : "missing"));
  const [authLabel, setAuthLabel] = React.useState(() =>
    getToken() ? "Авторизованная сессия" : "Не авторизован",
  );
  const [activePresetId, setActivePresetId] = React.useState(DEFAULT_PRESET_ID);
  const [editorKey, setEditorKey] = React.useState(0);

  const handleExpiredSession = React.useCallback(() => {
    clearToken();
    setAuthState("expired");
    setAuthLabel("Не авторизован");
  }, []);

  React.useEffect(() => {
    document.getElementById("graphiql-page-root")?.setAttribute("data-theme", theme);
  }, [theme]);

  React.useEffect(() => {
    if (!getToken()) {
      setAuthState("missing");
      setAuthLabel("Не авторизован");
      return undefined;
    }

    let isActive = true;

    fetchProfileLogin(handleExpiredSession)
      .then((login) => {
        if (!isActive || !getToken()) {
          return;
        }

        setAuthLabel(login ? `Авторизован как @${login}` : "Авторизованная сессия");
      })
      .catch(() => {
        if (isActive && getToken()) {
          setAuthLabel("Авторизованная сессия");
        }
      });

    return () => {
      isActive = false;
    };
  }, [handleExpiredSession]);

  const fetcher = React.useMemo(() => createFetcher(handleExpiredSession), [handleExpiredSession]);

  const handlePresetChange = React.useCallback(
    (event) => {
      const nextPresetId = event.target.value;

      if (nextPresetId === activePresetId) {
        return;
      }

      setActivePresetId(nextPresetId);
      setEditorKey((value) => value + 1);
    },
    [activePresetId],
  );

  const activePreset = getPreset(activePresetId);
  const showEditor = authState === "ready";

  return React.createElement(
    "div",
    { className: "graphiql-shell" },
    React.createElement(Topbar, {
      authLabel,
      activePresetId,
      onPresetChange: handlePresetChange,
      showPresets: showEditor,
    }),
    showEditor
      ? React.createElement(GraphiQLWorkspace, {
          preset: activePreset,
          editorKey,
          fetcher,
          theme,
        })
      : React.createElement(AuthGate, { state: authState }),
  );
}

const rootElement = document.getElementById("graphiql-page-root");

if (rootElement) {
  rootElement.setAttribute("data-theme", readTheme());
  createRoot(rootElement).render(React.createElement(App));
}
