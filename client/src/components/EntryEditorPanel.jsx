import { useState, useEffect } from "react";
import Tag from "./Tag.jsx";

/**
 * EntryEditorPanel — renders a segment's `blocks` (one string per line/
 * bullet) according to `displayMode`, or a textarea when `editing`.
 *
 * props: blocks[], displayMode, editing: bool, tags[], onSave(blocks, tags)
 */
export default function EntryEditorPanel({ blocks, displayMode, editing, tags = [], onSave }) {
  const [draftText, setDraftText] = useState(blocks.join("\n"));
  const [draftTags, setDraftTags] = useState(tags);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (editing) {
      setDraftText(blocks.join("\n"));
      setDraftTags(tags);
    }
  }, [editing, blocks, tags]);

  if (editing) {
    return (
      <div className="flex flex-col gap-3 p-4 sm:p-6">
        <label className="flex flex-col gap-1">
          <span className="text-size-1 text-text-muted">
            One line per {displayMode === "paragraph" ? "paragraph" : "entry"}
          </span>
          <textarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={10}
            className="min-h-[200px] w-full rounded-token-card border border-white/10 bg-surface
              p-3 text-size-3 leading-relaxed text-text-primary focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-accent-ice"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {draftTags.map((t) => (
            <Tag
              key={t}
              text={t}
              onRemove={() => setDraftTags(draftTags.filter((x) => x !== t))}
            />
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tagInput.trim()) {
                e.preventDefault();
                setDraftTags([...draftTags, tagInput.trim()]);
                setTagInput("");
              }
            }}
            placeholder="Add a tag, press Enter"
            className="min-h-[36px] rounded-full bg-surface px-3 py-1 text-size-1 text-text-primary
              placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-accent-ice"
          />
        </div>

        <button
          type="button"
          onClick={() =>
            onSave(
              draftText.split("\n").filter((line) => line.trim().length > 0),
              draftTags
            )
          }
          className="mt-1 inline-flex min-h-[44px] w-fit items-center justify-center rounded-token-card
            bg-grad-accent px-4 py-2 text-size-2 font-medium text-bg-deep hover:brightness-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice"
        >
          Save
        </button>
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <p className="p-4 text-size-2 text-text-muted sm:p-6">
        This segment is empty. Select Edit to start writing.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6">
      {displayMode === "paragraph" && (
        <div className="mx-auto max-w-[720px] space-y-4">
          {blocks.map((line, i) => (
            <p key={i} className="text-size-3 leading-relaxed text-text-primary">
              {line}
            </p>
          ))}
        </div>
      )}

      {displayMode === "bullet" && (
        <ul className="mx-auto max-w-[720px] list-disc space-y-2 pl-5 marker:text-accent-gold">
          {blocks.map((line, i) => (
            <li key={i} className="text-size-3 leading-relaxed text-text-primary">
              {line}
            </li>
          ))}
        </ul>
      )}

      {displayMode === "list" && (
        <ol className="mx-auto max-w-[720px] list-decimal space-y-2 pl-5 marker:text-accent-gold">
          {blocks.map((line, i) => (
            <li key={i} className="text-size-3 leading-relaxed text-text-primary">
              {line}
            </li>
          ))}
        </ol>
      )}

      {tags.length > 0 && (
        <div className="mx-auto flex max-w-[720px] flex-wrap gap-2 pt-2">
          {tags.map((t) => (
            <Tag key={t} text={t} />
          ))}
        </div>
      )}
    </div>
  );
}
