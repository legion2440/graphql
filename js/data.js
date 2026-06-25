export function toFiniteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

export function parseValidDate(value) {
  if (typeof value !== "string" && typeof value !== "number") {
    return null;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getProjectKey(transaction) {
  const objectId = transaction?.object?.id;

  if (objectId !== null && objectId !== undefined && String(objectId) !== "") {
    return `object:${objectId}`;
  }

  if (
    transaction?.objectId !== null &&
    transaction?.objectId !== undefined &&
    String(transaction.objectId) !== ""
  ) {
    return `object:${transaction.objectId}`;
  }

  const path = typeof transaction?.path === "string" ? transaction.path.trim() : "";
  return `path:${path || "unknown"}`;
}

export function getProjectName(transaction) {
  const objectName =
    typeof transaction?.object?.name === "string" ? transaction.object.name.trim() : "";

  if (objectName) {
    return objectName;
  }

  const path = typeof transaction?.path === "string" ? transaction.path : "";
  const segments = path.split("/").filter((segment) => segment.trim() !== "");

  return segments.at(-1) || "Unknown project";
}

export function sortTransactions(transactions) {
  return [...transactions].sort((left, right) => {
    const leftTime = left.date?.getTime();
    const rightTime = right.date?.getTime();
    const leftValid = Number.isFinite(leftTime);
    const rightValid = Number.isFinite(rightTime);

    if (leftValid && rightValid) {
      return leftTime - rightTime;
    }

    if (leftValid) {
      return 1;
    }

    if (rightValid) {
      return -1;
    }

    return left.sourceIndex - right.sourceIndex;
  });
}

export function normalizeTransactions(rawTransactions) {
  if (!Array.isArray(rawTransactions)) {
    return [];
  }

  const normalized = rawTransactions.map((transaction, sourceIndex) => ({
    id: transaction?.id ?? null,
    amount: toFiniteNumber(transaction?.amount),
    createdAt: transaction?.createdAt ?? null,
    date: parseValidDate(transaction?.createdAt),
    path: typeof transaction?.path === "string" ? transaction.path : "",
    objectId: transaction?.objectId ?? null,
    object:
      transaction?.object && typeof transaction.object === "object"
        ? {
            id: transaction.object.id ?? null,
            name:
              typeof transaction.object.name === "string" ? transaction.object.name : "",
            type:
              typeof transaction.object.type === "string" ? transaction.object.type : "",
          }
        : null,
    sourceIndex,
  }));

  return sortTransactions(normalized);
}

export function normalizeUser(rawUser) {
  const user = Array.isArray(rawUser) ? rawUser[0] : rawUser;

  if (!user || typeof user !== "object") {
    throw new Error("The profile query returned no authenticated user.");
  }

  return {
    id: user.id ?? "—",
    login: typeof user.login === "string" && user.login.trim() ? user.login : "Unknown",
    auditRatio: toFiniteNumber(user.auditRatio),
    totalUp: toFiniteNumber(user.totalUp),
    totalDown: toFiniteNumber(user.totalDown),
  };
}

export function calculateTotalXp(transactions) {
  return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

export function calculateCumulativeXp(transactions) {
  let cumulative = 0;

  return transactions.map((transaction) => {
    cumulative += transaction.amount;
    return {
      transaction,
      cumulative,
    };
  });
}

export function groupXpByProject(transactions) {
  const projects = new Map();

  for (const transaction of transactions) {
    const key = getProjectKey(transaction);
    const existing = projects.get(key);

    if (existing) {
      existing.xp += transaction.amount;
      existing.transactions += 1;

      if (existing.name === "Unknown project") {
        existing.name = getProjectName(transaction);
      }
    } else {
      projects.set(key, {
        key,
        name: getProjectName(transaction),
        xp: transaction.amount,
        transactions: 1,
      });
    }
  }

  return [...projects.values()].sort(
    (left, right) => right.xp - left.xp || left.name.localeCompare(right.name),
  );
}

export function getLastXpTransaction(transactions) {
  return transactions.at(-1) ?? null;
}
