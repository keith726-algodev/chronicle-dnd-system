import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavHeader from "../components/NavHeader.jsx";
import SegmentList from "../components/SegmentList.jsx";
import EntryEditorPanel from "../components/EntryEditorPanel.jsx";
import ComposerModal from "../components/ComposerModal.jsx";
import {
  listCategories,
  listSegments,
  createSegment,
  getSegment,
} from "../api/index.js";

export default function BranchScreen() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [segments, setSegments] = useState(null);
  const [error, setError] = useState(null);
  const [composerOpen, setComposerOpen] = useState(false);

  // Desktop shows a live preview pane for the selected segment; this is the
  // same SegmentListItem/NavHeader components as phone, just more room.
  const [preview, setPreview] = useState(null);

  async function refresh() {
    try {
      setError(null);
      const [cats, segs] = await Promise.all([
        listCategories(),
        listSegments(categoryId),
      ]);
      const cat = cats.find((c) => c.id === categoryId);
      setCategoryName(cat ? cat.name : "Category");
      setSegments(segs);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refresh();
    setPreview(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  async function handleSelect(seg) {
    navigate(`/categories/${categoryId}/segments/${seg.id}`);
  }

  async function handlePreview(seg) {
    const full = await getSegment(seg.id);
    setPreview(full);
  }

  async function handleCreateSegment(fields) {
    const seg = await createSegment(categoryId, fields);
    setComposerOpen(false);
    await refresh();
    navigate(`/categories/${categoryId}/segments/${seg.id}`);
  }

  return (
    <div className="min-h-screen">
      <NavHeader
        breadcrumb={[
          { label: "Chronicle", onPress: () => navigate("/") },
          { label: categoryName },
        ]}
        actions={[{ icon: "settings", label: "Settings", onPress: () => navigate("/settings") }]}
      />

      {error && (
        <p role="alert" className="mx-4 mt-2 rounded-token-card bg-red-500/10 p-3 text-size-2 text-red-300 sm:mx-6">
          Couldn&apos;t load this category: {error}
        </p>
      )}

      {!segments && !error && (
        <p className="p-6 text-size-2 text-text-muted">Loading segments…</p>
      )}

      {segments && (
        <div className="lg:flex">
          <div className="lg:w-[38%] lg:border-r lg:border-white/5">
            <SegmentList
              segments={segments}
              selectedId={preview?.id}
              onSelect={(seg) => {
                handlePreview(seg);
                // On small screens there is no preview pane, so tapping
                // a segment navigates straight to the Entry screen.
                if (window.matchMedia("(max-width: 1023px)").matches) {
                  handleSelect(seg);
                }
              }}
              onAddNew={() => setComposerOpen(true)}
            />
          </div>
          <div className="hidden lg:block lg:flex-1">
            {preview ? (
              <>
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                  <h2 className="text-size-4 font-semibold text-text-primary">{preview.title}</h2>
                  <button
                    type="button"
                    onClick={() => handleSelect(preview)}
                    className="min-h-[36px] rounded-token-card bg-grad-accent px-3 py-1.5 text-size-1 font-medium
                      text-bg-deep hover:brightness-95 focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-accent-ice"
                  >
                    Open full entry
                  </button>
                </div>
                <EntryEditorPanel
                  blocks={preview.blocks}
                  displayMode={preview.displayMode}
                  tags={preview.tags}
                  editing={false}
                  onSave={() => {}}
                />
              </>
            ) : (
              <p className="p-6 text-size-2 text-text-muted">
                Select a segment on the left to preview it here.
              </p>
            )}
          </div>
        </div>
      )}

      {composerOpen && (
        <ComposerModal
          mode="segment"
          onClose={() => setComposerOpen(false)}
          onSubmit={handleCreateSegment}
        />
      )}
    </div>
  );
}
