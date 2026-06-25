# GraphQL Profile

A fully static 01-edu profile dashboard that authenticates a user, loads profile and XP data through GraphQL, and renders two SVG statistics charts.

## Stack

HTML, CSS, vanilla JavaScript, ES modules, Fetch API, and SVG.

## Configuration

Set `API_BASE_URL` in `js/config.js` to the platform domain without a trailing slash:

```js
export const API_BASE_URL = "https://platform.example.com";
```

The application derives the sign-in and GraphQL endpoints from this single value.

## Run locally

Serve the repository with any static file server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Static deployment

Deploy the repository root to GitHub Pages or another static host. No build step or backend is required. The configured API must allow browser requests from the deployed origin.

## Dashboard sections

- Profile: login and user ID.
- XP: total XP, unique project count, and the latest XP transaction.
- Audits: server-provided audit ratio, total up, and total down.

The separate Statistics section contains:

- A cumulative XP line chart using every XP transaction in chronological order.
- An XP-by-project bar chart using every project, ordered by XP.

Both charts are created directly with the SVG DOM API.

## Required GraphQL query types

- Normal query: `PROFILE_QUERY` requests the authenticated user's profile and audit fields.
- Nested query: `XP_TRANSACTIONS_QUERY` requests each XP transaction and its nested `object`.
- Query with arguments: `XP_TRANSACTIONS_QUERY` uses `where`, `order_by`, and the `$type` GraphQL variable.
