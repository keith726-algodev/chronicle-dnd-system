import { useEffect, useRef, useState } from "react";
import Icon, { ICON_NAMES } from "./Icon.jsx";
import ColorSwatch from "./ColorSwatch.jsx";
import Button from "./Button.jsx";
import DisplayModeToggle from "./DisplayModeToggle.jsx";

const ACCENTS = ["#9FD8FF", "#D9B36C"];
const ICON_CHOICES = ICON_NAMES.filter(
  (n) => !["plus", "settings", "back", "search", "edit", "check", "close", "trash"].includes(n)
);

/**
 * ComposerModal — the "New Category / Segment Composer" screen from the
 * wireframes, shown as a modal over Home or Branch View. Traps focus while
 * open and returns it to the element that opened it on close.
 *
 * mode: "category" | "segment"
 */
export default function ComposerModal({ mode, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICON_CHOICES[0]);
  const [accentColor, setAccentColor] = useState(ACCENTS[0]);
  const [displayMode, setDisplayMode] = useState("bullet");
  const firstFieldRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusable = dialogRef.current.querySelectorAll(
          'button, input, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusable);
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (mode === "category") {
      onSubmit({ name: name.trim(), icon, accentColor });
    } else {
      onSubmit({ title: name.trim(), displayMode });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="composer-title"
        className="w-full max-w-md rounded-token-card border border-white/10 bg-grad-tile p-6 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="composer-title" className="text-size-4 font-semibold text-text-primary">
            {mode === "category" ? "New category" : "New segment"}
          </h2>
          <Button icon="close" iconOnly variant="ghost" aria-label="Close" onPress={onClose} />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-size-1 text-text-muted">Name</span>
            <input
              ref={firstFieldRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={mode === "category" ? "e.g. Deities & Pantheons" : "e.g. Classes"}
              className="min-h-[44px] rounded-token-card border border-white/10 bg-surface px-3
                text-size-2 text-text-primary placeholder:text-text-muted
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice"
            />
          </label>

          {mode === "category" && (
            <>
              <div className="flex flex-col gap-1">
                <span className="text-size-1 text-text-muted">Icon</span>
                <div className="flex flex-wrap gap-2">
                  {ICON_CHOICES.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setIcon(name)}
                      aria-pressed={icon === name}
                      aria-label={`Icon: ${name}`}
                      className={`flex h-10 w-10 items-center justify-center rounded-token-card border
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice
                        ${icon === name ? "border-accent-ice bg-surface" : "border-white/10"}`}
                    >
                      <Icon name={name} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-size-1 text-text-muted">Accent color</span>
                <div className="flex gap-2">
                  {ACCENTS.map((hex) => (
                    <ColorSwatch
                      key={hex}
                      hex={hex}
                      selected={accentColor === hex}
                      onSelect={setAccentColor}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {mode === "segment" && (
            <div className="flex flex-col gap-1">
              <span className="text-size-1 text-text-muted">Display style</span>
              <DisplayModeToggle value={displayMode} onChange={setDisplayMode} />
            </div>
          )}

          <div className="mt-2 flex justify-end gap-2">
            <Button label="Cancel" variant="ghost" onPress={onClose} />
            <Button label="Create" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
