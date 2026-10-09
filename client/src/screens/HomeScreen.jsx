import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavHeader from "../components/NavHeader.jsx";
import CategoryGrid from "../components/CategoryGrid.jsx";
import ComposerModal from "../components/ComposerModal.jsx";
import { listCategories, createCategory } from "../api/index.js";

export default function HomeScreen() {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState(null);
  const [composerOpen, setComposerOpen] = useState(false);
  const navigate = useNavigate();

  async function refresh() {
    try {
      setError(null);
      setCategories(await listCategories());
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreateCategory(fields) {
    await createCategory(fields);
    setComposerOpen(false);
    refresh();
  }

  return (
    <div className="min-h-screen">
      <NavHeader
        breadcrumb={[{ label: "Chronicle" }]}
        actions={[{ icon: "settings", label: "Settings", onPress: () => navigate("/settings") }]}
      />

      {error && (
        <p role="alert" className="mx-4 mt-2 rounded-token-card bg-red-500/10 p-3 text-size-2 text-red-300 sm:mx-6">
          Couldn&apos;t load your library: {error}
        </p>
      )}

      {!categories && !error && (
        <p className="p-6 text-size-2 text-text-muted">Loading your world…</p>
      )}

      {categories && (
        <CategoryGrid
          categories={categories}
          onTileOpen={(cat) => navigate(`/categories/${cat.id}`)}
          onAddNew={() => setComposerOpen(true)}
        />
      )}

      {composerOpen && (
        <ComposerModal
          mode="category"
          onClose={() => setComposerOpen(false)}
          onSubmit={handleCreateCategory}
        />
      )}
    </div>
  );
}
