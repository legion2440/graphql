export const API_BASE_URL = "https://your-platform-domain.example";

export const SIGNIN_URL = `${API_BASE_URL}/api/auth/signin`;
export const GRAPHQL_URL = `${API_BASE_URL}/api/graphql-engine/v1/graphql`;

export function assertApiConfigured() {
  const isPlaceholder =
    !API_BASE_URL ||
    API_BASE_URL.includes("your-platform-domain") ||
    API_BASE_URL.endsWith(".example");

  const hasTrailingSlash = API_BASE_URL.endsWith("/");

  if (isPlaceholder || hasTrailingSlash) {
    const error = new Error(
      "Set API_BASE_URL in js/config.js to your platform domain without a trailing slash.",
    );
    error.name = "ConfigurationError";
    throw error;
  }
}
