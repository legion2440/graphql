const THEME_KEY = "graphql-profile-theme";
const THEMES = new Set(["dark", "light"]);

function readStoredTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return THEMES.has(value) ? value : "dark";
  } catch {
    return "dark";
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Theme persistence is optional; the visual state still updates.
  }
}

function applyTheme(root, toggle, label, theme) {
  root.dataset.theme = theme;

  if (label) {
    label.textContent = theme === "dark" ? "DARK" : "LIGHT";
  }

  if (toggle) {
    const nextTheme = theme === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-pressed", String(theme === "light"));
    toggle.setAttribute(
      "aria-label",
      nextTheme === "light" ? "Переключить светлую тему" : "Переключить тёмную тему",
    );
  }
}

export function initTheme({ root, toggle, label }) {
  let theme = readStoredTheme();
  applyTheme(root, toggle, label, theme);

  toggle?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    applyTheme(root, toggle, label, theme);
    storeTheme(theme);
  });

  return {
    getTheme() {
      return theme;
    },
    setTheme(nextTheme) {
      theme = THEMES.has(nextTheme) ? nextTheme : "dark";
      applyTheme(root, toggle, label, theme);
      storeTheme(theme);
    },
  };
}
