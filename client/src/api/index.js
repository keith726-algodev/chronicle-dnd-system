// One interface, two implementations, chosen by a build-time variable.
// Only the exact string "false" turns demo mode off, so a forgotten or
// mistyped variable leaves the app on the safe, working mock backend.
import * as mockApi from "./mockApi.js";
import * as realApi from "./realApi.js";

export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

const api = USE_MOCK_API ? mockApi : realApi;

export const {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  listSegments,
  getSegment,
  createSegment,
  updateSegment,
  deleteSegment,
  getSettings,
  updateSettings,
} = api;
