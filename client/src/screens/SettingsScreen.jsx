import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavHeader from "../components/NavHeader.jsx";
import DisplayModeToggle from "../components/DisplayModeToggle.jsx";
import Icon from "../components/Icon.jsx";
import {
  getSettings,
  updateSettings,
  listCategories,
  updateCategory,
  deleteCategory,
} from "../api/index.js";

export default function SettingsScreen() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);

  async function refresh() {
    try {
      setError(null);
      const [s, cats] = await Promise.all([getSettings(), listCategories()]);
      setSettings(s);
      setCategories(cats);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleDefaultModeChange(defaultDisplayMode) {
    const updated = await updateSettings({ defaultDisplayMode });
    setSettings(updated);
  }

  async function move(cat, direction) {
    const sorted = [...categories].sort((a, b) => a.orderIndex - b.orderIndex);
    const idx = sorted.findIndex((c) => c.id === cat.id);
    const swapWith = sorted[idx + direction];
    if (!swapWith) return;
    await Promise.all([
      updateCategory(cat.id, { orderIndex: swapWith.orderIndex }),
      updateCategory(swapWith.id, { orderIndex: cat.orderIndex }),
    ]);
    refresh();
  }

  async function remove(cat) {
    const ok = window.confirm(
      `Delete "${cat.name}" and all of its segments? This can't be undone.`
    );
    if (!ok) return;
    await deleteCategory(cat.id);
    refresh();
  }

  return (
    <div className="min-h-screen">
      <NavHeader
        breadcrumb={[
          { label: "Chronicle", onPress: () => navigate("/") },
          { label: "Settings" },
        ]}
      />

      {error && (
        <p role="alert" className="mx-4 mt-2 rounded-token-card bg-red-500/10 p-3 text-size-2 text-red-300 sm:mx-6">
          Couldn&apos;t load settings: {error}
        </p>
      )}

      <div className="flex flex-col gap-8 p-4 sm:p-6">
        {settings && (
          <section className="flex flex-col gap-2">
            <h2 className="text-size-4 font-semibold text-accent-gold">Default display style</h2>
            <p className="text-size-2 text-text-muted">
              Used for every new segment you create. You can still change the style per segment.
            </p>
            <DisplayModeToggle value={settings.defaultDisplayMode} onChange={handleDefaultModeChange} />
          </section>
        )}

        {categories && (
          <section className="flex flex-col gap-2">
            <h2 className="text-size-4 font-semibold text-accent-gold">Library order</h2>
            <p className="text-size-2 text-text-muted">
              Reorder your top-level categories, or delete one. Deleting a category also deletes
              all of its segments.
            </p>
            <ul className="flex flex-col gap-2">
              {[...categories]
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map((cat, i) => (
                  <li
                    key={cat.id}
                    className="flex items-center justify-between gap-3 rounded-token-card bg-grad-tile px-4 py-3"
                  >
                    <span className="flex items-center gap-2 text-size-2 text-text-primary">
                      <Icon name={cat.icon} size={16} color={cat.accentColor} />
                      {cat.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => move(cat, -1)}
                        disabled={i === 0}
                        aria-label={`Move ${cat.name} up`}
                        className="min-h-[36px] min-w-[36px] rounded-token-card text-text-muted hover:bg-white/10
                          disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => move(cat, 1)}
                        disabled={i === categories.length - 1}
                        aria-label={`Move ${cat.name} down`}
                        className="min-h-[36px] min-w-[36px] rounded-token-card text-text-muted hover:bg-white/10
                          disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(cat)}
                        aria-label={`Delete ${cat.name}`}
                        className="min-h-[36px] min-w-[36px] rounded-token-card text-red-300 hover:bg-red-500/10
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </span>
                  </li>
                ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
