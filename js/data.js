import {
  CURRICULUM_SNAPSHOT,
  CURRICULUM_SNAPSHOT_META,
} from "./curriculum-snapshot.js?v=20260628-live-data10";

const CURRICULUM_SNAPSHOT_OBJECTS = new WeakSet(CURRICULUM_SNAPSHOT);
const OBJECT_SOURCE_META = Symbol("objectSourceMeta");

export function toFiniteNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function toOptionalNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
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

  const firstName = typeof user.firstName === "string" ? user.firstName.trim() : "";
  const lastName = typeof user.lastName === "string" ? user.lastName.trim() : "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  return {
    id: user.id ?? "—",
    login: typeof user.login === "string" && user.login.trim() ? user.login : "Unknown",
    firstName,
    lastName,
    fullName,
    campus: typeof user.campus === "string" && user.campus.trim() ? user.campus : "",
    auditRatio: toFiniteNumber(user.auditRatio),
    totalUp: toFiniteNumber(user.totalUp),
    totalDown: toFiniteNumber(user.totalDown),
  };
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeObjectRecord(object) {
  if (!object || typeof object !== "object") {
    return null;
  }
  const attrs = object.attrs && typeof object.attrs === "object" ? object.attrs : {};

  return {
    id: object.id ?? null,
    name: typeof object.name === "string" ? object.name : "",
    type: typeof object.type === "string" ? object.type : "",
    path:
      typeof object.path === "string"
        ? object.path
        : typeof attrs.path === "string"
          ? attrs.path
          : "",
    attrs,
  };
}

function normalizeProgressRows(rows) {
  return normalizeArray(rows).map((row, sourceIndex) => ({
    id: row?.id ?? null,
    userId: row?.userId ?? null,
    eventId: row?.eventId ?? null,
    objectId: row?.objectId ?? null,
    path: typeof row?.path === "string" ? row.path : "",
    grade: row?.grade === null || row?.grade === undefined ? null : toFiniteNumber(row.grade, null),
    isDone: Boolean(row?.isDone),
    createdAt: row?.createdAt ?? null,
    updatedAt: row?.updatedAt ?? null,
    createdDate: parseValidDate(row?.createdAt),
    updatedDate: parseValidDate(row?.updatedAt),
    object: normalizeObjectRecord(row?.object),
    sourceIndex,
  }));
}

function normalizeGroupRows(rows) {
  return normalizeArray(rows).map((row, sourceIndex) => ({
    id: row?.id ?? null,
    userId: row?.userId ?? null,
    userLogin: typeof row?.userLogin === "string" ? row.userLogin : "",
    userLevel: toFiniteNumber(row?.userLevel),
    groupId: row?.groupId ?? null,
    eventId: row?.eventId ?? null,
    path: typeof row?.path === "string" ? row.path : "",
    accepted: row?.accepted ?? null,
    enrollmentStatus: typeof row?.enrollmentStatus === "string" ? row.enrollmentStatus : "",
    createdAt: row?.createdAt ?? null,
    updatedAt: row?.updatedAt ?? null,
    createdDate: parseValidDate(row?.createdAt),
    updatedDate: parseValidDate(row?.updatedAt),
    group:
      row?.group && typeof row.group === "object"
        ? {
            id: row.group.id ?? null,
            status: typeof row.group.status === "string" ? row.group.status : "",
            createdAt: row.group.createdAt ?? null,
            updatedAt: row.group.updatedAt ?? null,
            captainId: row.group.captainId ?? null,
            object: normalizeObjectRecord(row.group.object),
          }
        : null,
    sourceIndex,
  }));
}

function aggregateSum(payload) {
  return toFiniteNumber(payload?.aggregate?.sum?.amount);
}

function aggregateCount(payload) {
  return toFiniteNumber(payload?.aggregate?.count);
}

export function normalizeProfileDetails(rawDetails = {}) {
  const eventUser = normalizeArray(rawDetails.event_user)[0] ?? null;
  const loadedSources =
    rawDetails.__loaded && typeof rawDetails.__loaded === "object" && !Array.isArray(rawDetails.__loaded)
      ? { ...rawDetails.__loaded }
      : {};
  const labels = normalizeArray(rawDetails.label_user).map((label) => ({
    id: label?.id ?? null,
    userId: label?.userId ?? null,
    eventId: label?.eventId ?? null,
    labelId: label?.labelId ?? null,
    labelName: typeof label?.labelName === "string" ? label.labelName : "",
    createdAt: label?.createdAt ?? null,
  }));
  const curriculumObjects = normalizeArray(rawDetails.curriculumObjects).map(normalizeObjectRecord).filter(Boolean);

  return {
    sources: loadedSources,
    eventUser: eventUser
      ? {
          id: eventUser.id ?? null,
          userId: eventUser.userId ?? null,
          eventId: eventUser.eventId ?? null,
          login: typeof eventUser.userLogin === "string" ? eventUser.userLogin : "",
          name: typeof eventUser.userName === "string" ? eventUser.userName.trim() : "",
          level: toOptionalNumber(eventUser.level),
          auditRatio: toOptionalNumber(eventUser.userAuditRatio),
          createdAt: eventUser.createdAt ?? null,
          xp:
            eventUser.xp && typeof eventUser.xp === "object"
              ? {
                  amount: toFiniteNumber(eventUser.xp.amount),
                  originEventId: eventUser.xp.originEventId ?? null,
                  path: typeof eventUser.xp.path === "string" ? eventUser.xp.path : "",
                }
              : null,
        }
      : null,
    labels,
    eventXpTotal: aggregateSum(rawDetails.eventXp),
    eventXpCount: aggregateCount(rawDetails.eventXp),
    allXpTotal: aggregateSum(rawDetails.allXp),
    allXpCount: aggregateCount(rawDetails.allXp),
    progress: normalizeProgressRows(rawDetails.progress),
    allDoneProgress: normalizeProgressRows(rawDetails.allDoneProgress),
    groups: normalizeGroupRows(rawDetails.group_user),
    events: normalizeArray(rawDetails.events).map((eventUserRow) => ({
      id: eventUserRow?.id ?? null,
      eventId: eventUserRow?.eventId ?? null,
      level: toFiniteNumber(eventUserRow?.level),
      createdAt: eventUserRow?.createdAt ?? null,
      event:
        eventUserRow?.event && typeof eventUserRow.event === "object"
          ? {
              id: eventUserRow.event.id ?? null,
              path: typeof eventUserRow.event.path === "string" ? eventUserRow.event.path : "",
              createdAt: eventUserRow.event.createdAt ?? null,
              startAt: eventUserRow.event.startAt ?? null,
              endAt: eventUserRow.event.endAt ?? null,
              object: normalizeObjectRecord(eventUserRow.event.object),
            }
          : null,
    })),
    auditCount: aggregateCount(rawDetails.auditsAsAuditor),
    recentAudits: normalizeArray(rawDetails.recentAuditsAsAuditor).map((audit) => ({
      id: audit?.id ?? null,
      auditorId: audit?.auditorId ?? null,
      groupId: audit?.groupId ?? null,
      grade: audit?.grade === null || audit?.grade === undefined ? null : toFiniteNumber(audit.grade, null),
      closureType: typeof audit?.closureType === "string" ? audit.closureType : "",
      createdAt: audit?.createdAt ?? null,
      updatedAt: audit?.updatedAt ?? null,
    })),
    records: normalizeArray(rawDetails.record_public_view).map((record) => ({
      userId: record?.userId ?? null,
      startAt: record?.startAt ?? null,
      endAt: record?.endAt ?? null,
    })),
    curriculumObjects,
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

const preciseIntegerFormatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
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

export function formatExactNumber(value) {
  return preciseIntegerFormatter.format(Number.isFinite(value) ? value : 0);
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
  return `${preciseIntegerFormatter.format(safe)} XP`;
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

export function getDisplayFirstName(user) {
  if (typeof user?.firstName === "string" && user.firstName.trim()) {
    return user.firstName.trim();
  }
  return getFirstName(user?.login);
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

export const SKILL_LABELS = Object.freeze({
  prog: "Elementary programming",
  "back-end": "Back-end",
  "front-end": "Front-end",
  algo: "Elementary algorithms",
  ai: "AI",
  tcp: "TCP/IP",
  stats: "Statistics",
  game: "Game programming",
  "sys-admin": "System administration",
  blockchain: "Blockchain",
  mobile: "Mobile development",
  cybersecurity: "Cybersecurity",
  ux: "UX/UI",
  cv: "Computer Vision",
  ml: "Machine Learning",
  llm: "Large Language Models",
  rag: "Retrieval-Augmented Generation",
  nlp: "Natural Language Processing",
  mlops: "MLOps",
  math: "Mathematics",
  genetic: "Genetic Algorithms",
  go: "Go",
  git: "Git",
  js: "JavaScript",
  html: "HTML",
  sql: "SQL",
  css: "CSS",
  unix: "Unix",
  docker: "Docker",
  rust: "Rust",
  java: "Java",
  "non-relational-db": "Non-relational Databases",
  c: "C",
  sh: "Shell",
  php: "PHP",
  python: "Python",
  ruby: "Ruby",
  "c++": "C++",
  graphql: "GraphQL",
  "ruby-on-rails": "Ruby on Rails",
  laravel: "Laravel",
  django: "Django",
});

const TECHNICAL_SKILL_KEYS = [
  "prog",
  "back-end",
  "front-end",
  "algo",
  "ai",
  "tcp",
  "stats",
  "game",
  "sys-admin",
  "blockchain",
  "mobile",
  "cybersecurity",
  "ux",
  "cv",
  "ml",
  "llm",
  "rag",
  "nlp",
  "mlops",
  "math",
  "genetic",
];

const TECHNOLOGY_SKILL_KEYS = [
  "go",
  "git",
  "js",
  "html",
  "sql",
  "css",
  "unix",
  "docker",
  "rust",
  "java",
  "non-relational-db",
  "c",
  "sh",
  "php",
  "python",
  "ruby",
  "c++",
  "graphql",
  "ruby-on-rails",
  "laravel",
  "django",
];

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasOwnProperty(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function getObjectSource(object) {
  return CURRICULUM_SNAPSHOT_OBJECTS.has(object) ? "snapshot" : "live";
}

function createObjectSourceMeta(object, source) {
  const attrSources = new Map();
  const attrs = isPlainObject(object?.attrs) ? object.attrs : {};
  for (const key of Object.keys(attrs)) {
    attrSources.set(key, source);
  }

  return {
    sources: new Set([source]),
    attrSources,
  };
}

function attachObjectSourceMeta(object, meta) {
  Object.defineProperty(object, OBJECT_SOURCE_META, {
    value: meta,
    enumerable: false,
    configurable: true,
  });
  return object;
}

function cloneObjectRecord(object, source) {
  const record = {
    ...object,
    attrs: isPlainObject(object?.attrs) ? { ...object.attrs } : {},
  };
  return attachObjectSourceMeta(record, createObjectSourceMeta(record, source));
}

function getObjectSourceMeta(object) {
  return object?.[OBJECT_SOURCE_META] ?? null;
}

function objectUsesSnapshot(object) {
  return getObjectSourceMeta(object)?.sources.has("snapshot") ?? false;
}

function objectAttrUsesSnapshot(object, ...attrs) {
  const meta = getObjectSourceMeta(object);
  return attrs.some((attr) => meta?.attrSources.get(attr) === "snapshot");
}

function fillMissingValue(existingValue, incomingValue) {
  if (existingValue !== null && existingValue !== undefined && existingValue !== "") {
    return existingValue;
  }

  return incomingValue ?? existingValue ?? "";
}

function normalizeObjectPath(path) {
  const value = typeof path === "string" ? path.trim() : "";
  return value.length > 1 ? value.replace(/\/+$/u, "") : value;
}

function mergeAttrsBySource(existingAttrs, incomingAttrs, meta, source) {
  const attrs = isPlainObject(existingAttrs) ? { ...existingAttrs } : {};
  if (!isPlainObject(incomingAttrs)) {
    return attrs;
  }

  for (const [key, value] of Object.entries(incomingAttrs)) {
    const existingSource = meta.attrSources.get(key);
    if (!hasOwnProperty(attrs, key) || (existingSource === "snapshot" && source !== "snapshot")) {
      attrs[key] = value;
      meta.attrSources.set(key, source);
    }
  }

  return attrs;
}

function getObjectNameFromPath(path) {
  const segments = String(path || "").split("/").filter(Boolean);
  return segments.at(-1) || "project";
}

function objectKeySet(row) {
  const keys = new Set();
  if (row?.objectId !== null && row?.objectId !== undefined) {
    keys.add(`id:${row.objectId}`);
  }
  if (row?.object?.id !== null && row?.object?.id !== undefined) {
    keys.add(`id:${row.object.id}`);
  }
  if (typeof row?.path === "string" && row.path.trim()) {
    keys.add(`path:${normalizeObjectPath(row.path)}`);
  }
  if (typeof row?.object?.path === "string" && row.object.path.trim()) {
    keys.add(`path:${normalizeObjectPath(row.object.path)}`);
  }
  return keys;
}

function mergeObjectRecords(objects) {
  const records = new Map();
  const strongAliases = new Map();
  const fallbackAliases = new Map();

  for (const object of objects) {
    if (!object) {
      continue;
    }

    const source = getObjectSource(object);
    const strongKeys = [...objectKeySet({ objectId: object.id, path: object.path, object })];
    const fallbackKey = strongKeys.length === 0 && object.name ? `name:${object.name}:${object.type}` : null;
    const existingKey = strongKeys.length > 0
      ? strongKeys.map((candidate) => strongAliases.get(candidate)).find(Boolean) ?? null
      : fallbackKey
        ? fallbackAliases.get(fallbackKey) ?? null
        : null;
    const key = existingKey ?? strongKeys[0] ?? fallbackKey;

    if (!key) {
      continue;
    }

    const existing = records.get(existingKey ?? key);
    if (existing) {
      const meta = getObjectSourceMeta(existing) ?? createObjectSourceMeta(existing, "live");
      meta.sources.add(source);
      records.set(existingKey ?? key, attachObjectSourceMeta({
        ...existing,
        name: fillMissingValue(existing.name, object.name),
        type: fillMissingValue(existing.type, object.type),
        path: fillMissingValue(existing.path, object.path),
        attrs: mergeAttrsBySource(existing.attrs, object.attrs, meta, source),
      }, meta));
      for (const alias of strongKeys) {
        strongAliases.set(alias, existingKey ?? key);
      }
      if (fallbackKey) {
        fallbackAliases.set(fallbackKey, existingKey ?? key);
      }
      continue;
    }

    records.set(key, cloneObjectRecord(object, source));
    for (const alias of strongKeys) {
      strongAliases.set(alias, key);
    }
    if (fallbackKey) {
      fallbackAliases.set(fallbackKey, key);
    }
  }

  return [...records.values()];
}

function mergeProgressRows(rows) {
  const records = new Map();

  for (const row of rows) {
    if (!row) {
      continue;
    }

    const keys = [...objectKeySet(row)];
    const key = keys[0] ?? `row:${records.size}`;
    if (!records.has(key)) {
      records.set(key, row);
    }
  }

  return [...records.values()];
}

function findMatchingObject(row, objects) {
  const rowKeys = objectKeySet(row);

  return objects.find((object) => {
    const objectKeys = objectKeySet({ objectId: object.id, path: object.path, object });
    return [...objectKeys].some((key) => rowKeys.has(key));
  }) ?? null;
}

function getBaseSkillsSourceForProgress(row, objects) {
  const directBaseSkills = row?.object?.attrs?.baseSkills;
  if (isPlainObject(directBaseSkills)) {
    return {
      baseSkills: directBaseSkills,
      usesSnapshot: false,
    };
  }

  const matchedObject = findMatchingObject(row, objects);
  const matchedBaseSkills = matchedObject?.attrs?.baseSkills;
  return isPlainObject(matchedBaseSkills)
    ? {
        baseSkills: matchedBaseSkills,
        usesSnapshot: objectAttrUsesSnapshot(matchedObject, "baseSkills"),
      }
    : {
        baseSkills: null,
        usesSnapshot: false,
      };
}

function findModuleObject(objects, campus = "astanahub") {
  const campusPrefix = `/${String(campus || "astanahub").toLowerCase()}/`;
  const modules = objects.filter((object) =>
    Array.isArray(object?.attrs?.timeline) &&
    Array.isArray(object?.attrs?.ranksDefinitions) &&
    Array.isArray(object?.attrs?.levelsDefinitions),
  );

  return (
    modules.find((object) => object.path.toLowerCase().startsWith(campusPrefix)) ??
    modules[0] ??
    objects.find((object) => object.path.toLowerCase().endsWith("/module")) ??
    null
  );
}

function objectsInProgram(objects, programPath) {
  if (!programPath) {
    return [];
  }

  const prefix = `${programPath}/`;
  return objects.filter((object) => object.path === programPath || object.path.startsWith(prefix));
}

function monthFromProgramStart(eventStartAt, monthIndex) {
  const start = parseValidDate(eventStartAt);
  if (!start) {
    return "—";
  }

  const date = new Date(start.getFullYear(), start.getMonth() + Number(monthIndex || 1) - 1, 1);
  return new Intl.DateTimeFormat("ru", { month: "short", year: "2-digit" })
    .format(date)
    .replace(".", "");
}

function getProgramMonthIndex(programStartAt, now = new Date()) {
  const start = parseValidDate(programStartAt);
  if (!start) {
    return null;
  }

  const monthIndex =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth()) +
    1;
  return Math.max(1, monthIndex);
}

function getRankDefinitions(moduleObject) {
  const definitions = moduleObject?.attrs?.ranksDefinitions;
  return Array.isArray(definitions)
    ? definitions
        .map((rank) => ({
          name: typeof rank?.name === "string" ? rank.name : "Rank",
          level: toFiniteNumber(rank?.level),
          milestone: typeof rank?.milestone === "string" ? rank.milestone : "",
        }))
        .sort((left, right) => left.level - right.level)
    : [];
}

function getLevelDefinitions(moduleObject) {
  const definitions = moduleObject?.attrs?.levelsDefinitions;
  return Array.isArray(definitions)
    ? definitions
        .map((level) => ({
          level: toFiniteNumber(level?.level),
          requirements: isPlainObject(level?.requirements) ? level.requirements : {},
        }))
        .sort((left, right) => left.level - right.level)
    : [];
}

function getTimelineRows(moduleObject, eventStartAt, programMonthIndex) {
  const timeline = moduleObject?.attrs?.timeline;
  if (!Array.isArray(timeline)) {
    return [];
  }

  return timeline.map((row) => ({
    month: toFiniteNumber(row?.month),
    label: parseValidDate(eventStartAt) ? monthFromProgramStart(eventStartAt, row?.month) : `Мес. ${toFiniteNumber(row?.month)}`,
    minLevel: toFiniteNumber(row?.minLevel),
    expectedLevel: toFiniteNumber(row?.expectedLevel),
    checkpointLevel: toFiniteNumber(row?.checkpointLevel),
    rank: typeof row?.rank === "string" ? row.rank : "",
    notes: typeof row?.notes === "string" ? row.notes : "",
    isCurrent: programMonthIndex !== null && toFiniteNumber(row?.month) === programMonthIndex,
  }));
}

function getCurrentTimelineRow(timelineRows, programMonthIndex) {
  if (timelineRows.length === 0 || programMonthIndex === null) {
    return null;
  }

  const current = timelineRows.find((row) => row.isCurrent);
  if (current) {
    return current;
  }

  if (programMonthIndex < timelineRows[0].month) {
    return timelineRows[0];
  }

  return timelineRows.at(-1) ?? null;
}

function getSkillTier() {
  return null;
}

function buildSkillStats(objects, completedProgress) {
  const completedKeys = new Set();
  for (const row of completedProgress) {
    for (const key of objectKeySet(row)) {
      completedKeys.add(key);
    }
  }

  const stats = new Map();
  for (const object of objects) {
    const baseSkills = object?.attrs?.baseSkills;
    if (!isPlainObject(baseSkills)) {
      continue;
    }

    const objectKeys = objectKeySet({ objectId: object.id, path: object.path });
    const isCompleted = [...objectKeys].some((key) => completedKeys.has(key));

    for (const key of Object.keys(baseSkills)) {
      if (!stats.has(key)) {
        stats.set(key, {
          key,
          label: SKILL_LABELS[key] || key,
          completed: 0,
          total: 0,
          value: 0,
          group: TECHNICAL_SKILL_KEYS.includes(key) ? "technical" : "technology",
        });
      }

      const entry = stats.get(key);
      entry.total += 1;
      if (isCompleted) {
        entry.completed += 1;
      }
    }
  }

  return [...stats.values()]
    .map((entry) => {
      const percent = entry.total > 0 ? Math.round((entry.completed / entry.total) * 100) : 0;
      const tier = getSkillTier(entry.completed, entry.total);
      return {
        ...entry,
        value: percent,
        tier,
      };
    })
    .sort((left, right) => right.value - left.value || right.completed - left.completed || left.label.localeCompare(right.label));
}

function pickSkills(stats, keys, minimumItems = 10) {
  const keyed = keys
    .map((key) => stats.find((skill) => skill.key === key))
    .filter(Boolean);
  const extra = stats.filter((skill) => !keys.includes(skill.key));
  return [...keyed, ...extra].slice(0, minimumItems);
}

function getBestFriend(groups, currentUserId) {
  const partnerCounts = new Map();

  for (const groupRow of groups) {
    const captainId = groupRow?.group?.captainId;
    if (captainId && captainId !== currentUserId) {
      partnerCounts.set(captainId, (partnerCounts.get(captainId) || 0) + 1);
    }
  }

  const [id, count] =
    [...partnerCounts.entries()].sort((left, right) => right[1] - left[1])[0] ?? [];
  return id ? { id, count } : null;
}

export function deriveProfileInsights(user, details, transactions) {
  const hasEventData = Boolean(details?.sources?.event);
  const hasProgressData = Boolean(details?.sources?.progress);
  const hasGroupsData = Boolean(details?.sources?.groups);
  const hasCurriculumLiveData = Boolean(details?.sources?.curriculum);
  const progressObjects = [
    ...(details?.progress ?? []).map((row) => row.object),
    ...(details?.allDoneProgress ?? []).map((row) => row.object),
    ...(details?.groups ?? []).map((row) => row.group?.object),
    ...(details?.events ?? []).map((row) => row.event?.object),
  ];
  const objects = mergeObjectRecords([
    ...(details?.curriculumObjects ?? []),
    ...progressObjects,
    ...CURRICULUM_SNAPSHOT,
  ]);
  const moduleObject = findModuleObject(objects, user?.campus);
  const programObjects = objectsInProgram(objects, moduleObject?.path);
  const timelineUsesCurriculumSnapshot = objectAttrUsesSnapshot(moduleObject, "timeline");
  const rankUsesCurriculumSnapshot = objectAttrUsesSnapshot(moduleObject, "ranksDefinitions");
  const programUsesCurriculumSnapshot = programObjects.some(objectUsesSnapshot) || objectUsesSnapshot(moduleObject);
  const hasLiveLevel = Number.isFinite(details?.eventUser?.level);
  const level = hasLiveLevel ? details.eventUser.level : null;
  const ranks = getRankDefinitions(moduleObject);
  const levels = getLevelDefinitions(moduleObject);
  const currentRank = hasLiveLevel ? [...ranks].reverse().find((rank) => rank.level <= level) ?? null : null;
  const nextRank = hasLiveLevel ? ranks.find((rank) => rank.level > level) ?? null : null;
  const rankProgress = currentRank && nextRank
    ? Math.round(((level - currentRank.level) / Math.max(1, nextRank.level - currentRank.level)) * 100)
    : currentRank && !nextRank
      ? 100
      : null;
  const confirmedProgramStartAt = details?.eventUser?.createdAt ?? null;
  const programStartAt = parseValidDate(confirmedProgramStartAt) ? confirmedProgramStartAt : null;
  const programMonthIndex = getProgramMonthIndex(programStartAt);
  const timelineRows = getTimelineRows(moduleObject, programStartAt, programMonthIndex);
  const timelineCurrent = getCurrentTimelineRow(timelineRows, programMonthIndex);
  const isBehindTimeline = hasLiveLevel && timelineCurrent ? level < timelineCurrent.minLevel : false;
  const batch = details?.labels?.find((label) =>
    label.eventId === details?.eventUser?.eventId && /^Batch\s+/i.test(label.labelName),
  )?.labelName ?? "";
  const doneProgress = hasProgressData ? details?.progress?.filter((row) => row.isDone) ?? [] : [];
  const doneProjectProgress = doneProgress.filter((row) => row.object?.type === "project");
  const doneProjectRows = mergeProgressRows(doneProjectProgress);
  const allDoneProgress = hasProgressData ? details?.allDoneProgress ?? [] : [];
  const recentDoneProgress = doneProjectRows.filter((row) => {
    const time = row.updatedDate?.getTime();
    if (!Number.isFinite(time)) {
      return false;
    }
    return Date.now() - time <= 7 * 24 * 60 * 60 * 1000;
  });
  const latestProgress = hasProgressData ? details?.progress?.[0] ?? null : null;
  const completedProgressForSkills = mergeProgressRows([...allDoneProgress, ...doneProgress]);
  const latestCompleted = allDoneProgress[0] ?? doneProgress[0] ?? null;
  const latestBaseSkillsSource = getBaseSkillsSourceForProgress(latestCompleted, programObjects);
  const latestBaseSkills = latestBaseSkillsSource.baseSkills;
  const latestSkillKey = isPlainObject(latestBaseSkills)
    ? Object.entries(latestBaseSkills).sort((left, right) => toFiniteNumber(right[1]) - toFiniteNumber(left[1]))[0]?.[0]
    : null;
  const skillsUseCurriculumSnapshot = hasProgressData && programObjects.some((object) =>
    isPlainObject(object?.attrs?.baseSkills) && objectAttrUsesSnapshot(object, "baseSkills"),
  );
  const skillStats = hasProgressData ? buildSkillStats(programObjects, completedProgressForSkills) : [];
  const technicalSkills = pickSkills(skillStats.filter((skill) => skill.group === "technical"), TECHNICAL_SKILL_KEYS, 10);
  const technologySkills = pickSkills(skillStats.filter((skill) => skill.group === "technology"), TECHNOLOGY_SKILL_KEYS, 10);
  const activeGroups = (details?.groups ?? []).filter((group) =>
    ["working", "setup"].includes(group?.group?.status),
  );
  const uniqueGroupIds = new Set((details?.groups ?? []).map((group) => group.groupId).filter(Boolean));
  const uniqueProjectPartners = new Set(
    (details?.groups ?? [])
      .map((group) => group?.group?.captainId)
      .filter((captainId) => captainId && captainId !== user.id),
  );
  const bestFriend = getBestFriend(details?.groups ?? [], user.id);

  return {
    hasEventData,
    hasProgressData,
    hasGroupsData,
    hasCurriculumLiveData,
    eventId: details?.eventUser?.eventId ?? null,
    eventUser: details?.eventUser ?? null,
    eventXpTotal: details?.eventXpTotal ?? calculateTotalXp(transactions),
    allXpTotal: details?.allXpTotal ?? calculateTotalXp(transactions),
    eventXpCount: details?.eventXpCount ?? transactions.length,
    allXpCount: details?.allXpCount ?? transactions.length,
    level,
    batch,
    campus: user?.campus || "",
    hasLiveLevel,
    programStartAt,
    programMonthIndex,
    usesCurriculumSnapshot: programUsesCurriculumSnapshot,
    curriculumSnapshotMeta: programUsesCurriculumSnapshot ? CURRICULUM_SNAPSHOT_META : null,
    rankSnapshotMeta: rankUsesCurriculumSnapshot ? CURRICULUM_SNAPSHOT_META : null,
    timelineSnapshotMeta: timelineUsesCurriculumSnapshot ? CURRICULUM_SNAPSHOT_META : null,
    forecastSnapshotMeta: timelineUsesCurriculumSnapshot || rankUsesCurriculumSnapshot ? CURRICULUM_SNAPSHOT_META : null,
    skillsUseCurriculumSnapshot,
    skillsSnapshotMeta: skillsUseCurriculumSnapshot ? CURRICULUM_SNAPSHOT_META : null,
    latestSkillSnapshotMeta: latestBaseSkillsSource.usesSnapshot ? CURRICULUM_SNAPSHOT_META : null,
    ranks,
    levels,
    currentRank,
    nextRank,
    rankProgress: rankProgress === null ? null : Math.max(0, Math.min(100, rankProgress)),
    timelineRows,
    timelineCurrent,
    isBehindTimeline,
    doneProgressCount: doneProjectRows.length,
    recentDoneProgressCount: recentDoneProgress.length,
    latestProgress,
    latestCompleted,
    latestSkill:
      latestSkillKey && (SKILL_LABELS[latestSkillKey] || latestSkillKey)
        ? SKILL_LABELS[latestSkillKey] || latestSkillKey
        : "—",
    technicalSkills,
    technologySkills,
    topSkills: [...technicalSkills, ...technologySkills].sort(
      (left, right) => right.value - left.value || right.completed - left.completed,
    ),
    activeGroups,
    uniqueProjectCount: uniqueGroupIds.size,
    uniquePartnerCount: uniqueProjectPartners.size,
    bestFriend,
    auditCount: details?.auditCount ?? 0,
    recentAudits: details?.recentAudits ?? [],
    eventHistory: details?.events ?? [],
    records: details?.records ?? [],
  };
}
