import { SIGNIN_URL, assertApiConfigured } from "./config.js";

const TOKEN_KEY = "graphql-profile-jwt";

export class AuthenticationError extends Error {
  constructor(message, status = 0) {
    super(message);
    this.name = "AuthenticationError";
    this.status = status;
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

function encodeBasicCredentials(identifier, password) {
  const bytes = new TextEncoder().encode(`${identifier}:${password}`);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function extractToken(responseText) {
  let payload;

  try {
    payload = JSON.parse(responseText);
  } catch {
    throw new AuthenticationError("The sign-in response did not contain valid JSON.");
  }

  const token = typeof payload === "string" ? payload : payload?.token;

  if (typeof token !== "string" || token.trim() === "") {
    throw new AuthenticationError("The sign-in response did not contain a JWT.");
  }

  return token;
}

export async function signIn(identifier, password) {
  assertApiConfigured();

  let response;

  try {
    response = await fetch(SIGNIN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodeBasicCredentials(identifier, password)}`,
      },
    });
  } catch {
    throw new NetworkError("Unable to reach the authentication service.");
  }

  if (response.status === 401 || response.status === 403) {
    throw new AuthenticationError("Invalid username/email or password.", response.status);
  }

  if (!response.ok) {
    throw new AuthenticationError(
      `Authentication failed with HTTP status ${response.status}.`,
      response.status,
    );
  }

  return extractToken(await response.text());
}

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function storeToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function logout() {
  clearToken();
}
