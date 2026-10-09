const MODES = [
  { value: "bullet", label: "Bullet" },
  { value: "list", label: "List" },
  { value: "paragraph", label: "Paragraph" },
];

export default function DisplayModeToggle({ value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Note display style"
      className="inline-flex rounded-token-card bg-surface p-1 text-size-1"
    >
      {MODES.map((mode) => (
        <button
          key={mode.value}
          type="button"
          role="radio"
          aria-checked={value === mode.value}
          onClick={() => onChange(mode.value)}
          className={`min-h-[36px] rounded-[9px] px-3 py-1.5 font-medium transition
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice
            ${value === mode.value
              ? "bg-grad-accent text-bg-deep"
              : "text-text-muted hover:text-text-primary"}`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}
