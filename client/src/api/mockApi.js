// Demo-mode implementation of the Chronicle API.
// Answers every call from localStorage so the app works with no server.
// Must expose exactly the same functions, with the same shapes, as realApi.js.

import seed from "./seed.json";

const STORE_KEY = "chronicle.v1";

function load() {
  const raw = localStorage.getItem(STORE_KEY);
  if (!raw) {
    const initial = structuredClone(seed);
    localStorage.setItem(STORE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const initial = structuredClone(seed);
    localStorage.setItem(STORE_KEY, JSON.stringify(initial));
    return initial;
  }
}

function save(db) {
  localStorage.setItem(STORE_KEY, JSON.stringify(db));
}

function id(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

// Simulate network latency so loading states are visible and real in demo mode.
function delay(value, ms = 180) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function withSegmentCounts(db) {
  return db.categories
    .filter((c) => !c.archived)
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((c) => ({
      ...c,
      segmentCount: db.segments.filter((s) => s.categoryId === c.id).length,
    }));
}

export async function listCategories() {
  const db = load();
  return delay(withSegmentCounts(db));
}

export async function createCategory({ name, icon, accentColor }) {
  const db = load();
  const orderIndex = db.categories.length
    ? Math.max(...db.categories.map((c) => c.orderIndex)) + 1
    : 0;
  const category = {
    id: id("cat"),
    name,
    icon: icon || "book",
    accentColor: accentColor || "#9FD8FF",
    orderIndex,
    archived: false,
  };
  db.categories.push(category);
  save(db);
  return delay({ ...category, segmentCount: 0 });
}

export async function updateCategory(categoryId, patch) {
  const db = load();
  const cat = db.categories.find((c) => c.id === categoryId);
  if (!cat) throw new Error("Category not found");
  Object.assign(cat, patch);
  save(db);
  return delay(cat);
}

export async function deleteCategory(categoryId) {
  const db = load();
  db.categories = db.categories.filter((c) => c.id !== categoryId);
  db.segments = db.segments.filter((s) => s.categoryId !== categoryId);
  save(db);
  return delay({ ok: true });
}

export async function listSegments(categoryId) {
  const db = load();
  return delay(
    db.segments
      .filter((s) => s.categoryId === categoryId)
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((s) => ({
        id: s.id,
        categoryId: s.categoryId,
        title: s.title,
        previewText: (s.blocks[0] || "").slice(0, 90),
        tags: s.tags,
        displayMode: s.displayMode,
        orderIndex: s.orderIndex,
      }))
  );
}

export async function getSegment(segmentId) {
  const db = load();
  const seg = db.segments.find((s) => s.id === segmentId);
  if (!seg) throw new Error("Segment not found");
  return delay(seg);
}

export async function createSegment(categoryId, { title, displayMode }) {
  const db = load();
  const siblings = db.segments.filter((s) => s.categoryId === categoryId);
  const orderIndex = siblings.length
    ? Math.max(...siblings.map((s) => s.orderIndex)) + 1
    : 0;
  const segment = {
    id: id("seg"),
    categoryId,
    title: title || "Untitled",
    displayMode: displayMode || "bullet",
    tags: [],
    blocks: [""],
    orderIndex,
  };
  db.segments.push(segment);
  save(db);
  return delay(segment);
}

export async function updateSegment(segmentId, patch) {
  const db = load();
  const seg = db.segments.find((s) => s.id === segmentId);
  if (!seg) throw new Error("Segment not found");
  Object.assign(seg, patch);
  save(db);
  return delay(seg);
}

export async function deleteSegment(segmentId) {
  const db = load();
  db.segments = db.segments.filter((s) => s.id !== segmentId);
  save(db);
  return delay({ ok: true });
}

export async function getSettings() {
  const db = load();
  return delay(db.settings);
}

export async function updateSettings(patch) {
  const db = load();
  db.settings = { ...db.settings, ...patch };
  save(db);
  return delay(db.settings);
}
