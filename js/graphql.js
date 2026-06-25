import { clearToken, getToken } from "./auth.js";
import { GRAPHQL_URL, assertApiConfigured } from "./config.js";

export class GraphQLRequestError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "GraphQLRequestError";
    this.status = options.status ?? 0;
    this.graphQLErrors = options.graphQLErrors ?? [];
  }
}

export class ExpiredSessionError extends Error {
  constructor() {
    super("Your session has expired. Please sign in again.");
    this.name = "ExpiredSessionError";
    this.status = 401;
  }
}

export async function graphqlRequest(query, variables = {}) {
  assertApiConfigured();

  const token = getToken();

  if (!token) {
    throw new ExpiredSessionError();
  }

  let response;

  try {
    response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch {
    throw new GraphQLRequestError("Unable to reach the GraphQL service.");
  }

  if (response.status === 401) {
    clearToken();
    throw new ExpiredSessionError();
  }

  let payload;

  try {
    payload = await response.json();
  } catch {
    throw new GraphQLRequestError(
      `The GraphQL service returned an invalid response (HTTP ${response.status}).`,
      { status: response.status },
    );
  }

  if (!response.ok) {
    const serverMessage = payload?.errors?.[0]?.message;
    throw new GraphQLRequestError(
      serverMessage || `GraphQL request failed with HTTP status ${response.status}.`,
      {
        status: response.status,
        graphQLErrors: payload?.errors,
      },
    );
  }

  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    throw new GraphQLRequestError(
      payload.errors.map((error) => error.message).filter(Boolean).join("; ") ||
        "The GraphQL service returned an error.",
      { graphQLErrors: payload.errors },
    );
  }

  if (!payload || typeof payload.data !== "object" || payload.data === null) {
    throw new GraphQLRequestError("The GraphQL response did not contain a data field.");
  }

  return payload.data;
}
