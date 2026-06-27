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

const compactFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
  maximumFractionDigits: 1,
});

const integerFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatLocalDayKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfLocalDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfWeekMonday(date) {
  const day = date.getDay() || 7;
  return addDays(startOfLocalDay(date), 1 - day);
}

function endOfWeekSunday(date) {
  const day = date.getDay() || 7;
  return addDays(startOfLocalDay(date), 7 - day);
}

function monthLabel(date) {
  return new Intl.DateTimeFormat("ru", { month: "short" })
    .format(date)
    .replace(".", "");
}

export function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

export function formatInteger(value) {
  return integerFormatter.format(Number.isFinite(value) ? value : 0);
}

export function formatCompactNumber(value) {
  const safe = Number.isFinite(value) ? value : 0;
  if (Math.abs(safe) >= 10000) {
    return compactFormatter.format(safe);
  }
  return formatInteger(safe);
}

export function formatXp(value) {
  const safe = Number.isFinite(value) ? value : 0;
  const sign = safe < 0 ? "-" : "";
  const absolute = Math.abs(safe);

  if (absolute >= 1_000_000) {
    return `${sign}${numberFormatter.format(absolute / 1_000_000)} MB`;
  }

  if (absolute >= 1_000) {
    return `${sign}${numberFormatter.format(absolute / 1_000)} kB`;
  }

  return `${integerFormatter.format(safe)} B`;
}

export function formatRawXp(value) {
  const safe = Number.isFinite(value) ? value : 0;
  return `${integerFormatter.format(safe)} bytes`;
}

export function formatDate(date) {
  return date instanceof Date && !Number.isNaN(date.getTime())
    ? dateFormatter.format(date)
    : "Date unavailable";
}

export function getInitials(login) {
  const source = typeof login === "string" && login.trim() ? login.trim() : "U";
  const parts = source.split(/[._\-\s]+/).filter(Boolean);
  const first = parts[0]?.[0] || source[0] || "U";
  const second = parts[1]?.[0] || parts[0]?.[1] || first;
  return `${first}${second}`.toUpperCase();
}

export function getFirstName(login) {
  const source = typeof login === "string" && login.trim() ? login.trim() : "student";
  const first = source.split(/[._\-\s]+/).filter(Boolean)[0] || source;
  return first.charAt(0).toUpperCase() + first.slice(1);
}

export function calculateAuditPercentages(totalUp, totalDown) {
  const up = Math.max(0, toFiniteNumber(totalUp));
  const down = Math.max(0, toFiniteNumber(totalDown));
  const sum = up + down;

  if (sum <= 0) {
    return { upPercent: 0, downPercent: 0 };
  }

  return {
    upPercent: Math.round((up / sum) * 100),
    downPercent: Math.round((down / sum) * 100),
  };
}

export function getAuditMeta(auditRatio) {
  const ratio = toFiniteNumber(auditRatio);

  if (ratio <= 0.4) {
    return {
      color: "oklch(0.64 0.21 25)",
      tint: "oklch(0.64 0.21 25 / 0.16)",
      status: "Блокировка",
      note: "Нельзя подать проект на аудит — сначала проверь чужие работы.",
    };
  }

  if (ratio < 0.6) {
    return {
      color: "oklch(0.64 0.21 25)",
      tint: "oklch(0.64 0.21 25 / 0.16)",
      status: "Осторожно",
      note: "Низкий баланс — ещё немного, и подавать проекты будет нельзя.",
    };
  }

  if (ratio <= 0.8) {
    return {
      color: "oklch(0.80 0.15 85)",
      tint: "oklch(0.80 0.15 85 / 0.18)",
      status: "Подтяни аудиты",
      note: "Норма, но проверь пару чужих работ, чтобы держать запас.",
    };
  }

  return {
    color: "var(--lime)",
    tint: "var(--lime-a)",
    status: "Здоровый баланс",
    note: "Ты проверяешь больше, чем получаешь — отдача в плюсе.",
  };
}

export function buildActivityHeatmapData(transactions) {
  const validTransactions = transactions.filter((transaction) => transaction.date);
  const totalsByDay = new Map();

  for (const transaction of validTransactions) {
    const dayKey = formatLocalDayKey(transaction.date);
    totalsByDay.set(dayKey, (totalsByDay.get(dayKey) || 0) + transaction.amount);
  }

  const validDates = validTransactions.map((transaction) => startOfLocalDay(transaction.date));
  const actualStart =
    validDates.length > 0
      ? new Date(Math.min(...validDates.map((date) => date.getTime())))
      : startOfLocalDay(new Date());
  const actualEnd =
    validDates.length > 0
      ? new Date(Math.max(...validDates.map((date) => date.getTime())))
      : startOfLocalDay(new Date());

  const start = startOfWeekMonday(actualStart);
  let end = endOfWeekSunday(actualEnd);
  const minimumWeeks = 7;
  const currentWeeks = Math.max(1, Math.ceil((end - start + 1) / (7 * 24 * 60 * 60 * 1000)));

  if (currentWeeks < minimumWeeks) {
    end = addDays(start, minimumWeeks * 7 - 1);
  }

  const maxDailyXp = Math.max(0, ...totalsByDay.values());
  const cells = [];

  for (let day = new Date(start); day <= end; day = addDays(day, 1)) {
    const key = formatLocalDayKey(day);
    const xp = totalsByDay.get(key) || 0;
    const ratio = maxDailyXp > 0 ? Math.max(0, xp) / maxDailyXp : 0;
    let level = 0;

    if (ratio > 0) {
      level = Math.min(4, Math.max(1, Math.ceil(ratio * 4)));
    }

    cells.push({
      date: new Date(day),
      key,
      xp,
      level,
    });
  }

  const weeks = Math.ceil(cells.length / 7);
  const months = [];
  let previousMonth = "";

  for (let week = 0; week < weeks; week += 1) {
    const cell = cells[week * 7];
    const label = monthLabel(cell.date);

    if (label !== previousMonth) {
      months.push({ label, week });
      previousMonth = label;
    }
  }

  return {
    cells,
    weeks,
    months,
    activeDays: [...totalsByDay.values()].filter((xp) => xp !== 0).length,
    period:
      validDates.length > 0
        ? `${formatDate(actualStart)} — ${formatDate(actualEnd)}`
        : "No XP dates",
  };
}
