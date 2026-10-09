// Live implementation of the Chronicle API.
// Calls the Express API at VITE_API_BASE_URL. Same function names and
// shapes as mockApi.js — this is the other half of the one-interface,
// two-implementations pattern described in the README.

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  if (!BASE_URL) {
    throw new Error(
      "VITE_API_BASE_URL is not set. Demo mode is off but there is no API to call."
    );
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // response had no JSON body; keep the generic message
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function listCategories() {
  return request("/api/categories");
}

export async function createCategory({ name, icon, accentColor }) {
  return request("/api/categories", {
    method: "POST",
    body: JSON.stringify({ name, icon, accentColor }),
  });
}

export async function updateCategory(categoryId, patch) {
  return request(`/api/categories/${categoryId}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteCategory(categoryId) {
  return request(`/api/categories/${categoryId}`, { method: "DELETE" });
}

export async function listSegments(categoryId) {
  return request(`/api/categories/${categoryId}/segments`);
}

export async function getSegment(segmentId) {
  return request(`/api/segments/${segmentId}`);
}

export async function createSegment(categoryId, { title, displayMode }) {
  return request(`/api/categories/${categoryId}/segments`, {
    method: "POST",
    body: JSON.stringify({ title, displayMode }),
  });
}

export async function updateSegment(segmentId, patch) {
  return request(`/api/segments/${segmentId}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteSegment(segmentId) {
  return request(`/api/segments/${segmentId}`, { method: "DELETE" });
}

export async function getSettings() {
  return request("/api/settings");
}

export async function updateSettings(patch) {
  return request("/api/settings", {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}
