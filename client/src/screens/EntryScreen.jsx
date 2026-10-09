import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavHeader from "../components/NavHeader.jsx";
import DisplayModeToggle from "../components/DisplayModeToggle.jsx";
import EntryEditorPanel from "../components/EntryEditorPanel.jsx";
import { getSegment, updateSegment, deleteSegment, listCategories } from "../api/index.js";

export default function EntryScreen() {
  const { categoryId, segmentId } = useParams();
  const navigate = useNavigate();
  const [segment, setSegment] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);

  async function refresh() {
    try {
      setError(null);
      const [seg, cats] = await Promise.all([getSegment(segmentId), listCategories()]);
      setSegment(seg);
      const cat = cats.find((c) => c.id === categoryId);
      setCategoryName(cat ? cat.name : "Category");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refresh();
    setEditing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmentId]);

  async function handleDisplayModeChange(displayMode) {
    const updated = await updateSegment(segmentId, { displayMode });
    setSegment(updated);
  }

  async function handleSave(blocks, tags) {
    const updated = await updateSegment(segmentId, { blocks, tags });
    setSegment(updated);
    setEditing(false);
  }

  async function handleDelete() {
    const ok = window.confirm(`Delete "${segment.title}"? This can't be undone.`);
    if (!ok) return;
    try {
      await deleteSegment(segmentId);
      navigate(`/categories/${categoryId}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen">
      <NavHeader
        breadcrumb={[
          { label: "Chronicle", onPress: () => navigate("/") },
          { label: categoryName, onPress: () => navigate(`/categories/${categoryId}`) },
          { label: segment?.title || "…" },
        ]}
        actions={[
          { icon: "trash", label: "Delete segment", onPress: handleDelete },
          { icon: editing ? "check" : "edit", label: editing ? "Done" : "Edit", onPress: () => setEditing((e) => !e) },
        ]}
      />

      {error && (
        <p role="alert" className="mx-4 mt-2 rounded-token-card bg-red-500/10 p-3 text-size-2 text-red-300 sm:mx-6">
          Couldn&apos;t load this entry: {error}
        </p>
      )}

      {!segment && !error && (
        <p className="p-6 text-size-2 text-text-muted">Loading entry…</p>
      )}

      {segment && (
        <>
          <div className="px-4 pt-4 sm:px-6">
            <DisplayModeToggle value={segment.displayMode} onChange={handleDisplayModeChange} />
          </div>
          <EntryEditorPanel
            blocks={segment.blocks}
            displayMode={segment.displayMode}
            tags={segment.tags}
            editing={editing}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
}
