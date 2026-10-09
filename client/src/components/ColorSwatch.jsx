export default function ColorSwatch({ hex, selected = false, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(hex)}
      aria-label={`Choose accent color ${hex}`}
      aria-pressed={selected}
      style={{ backgroundColor: hex }}
      className={`h-8 w-8 rounded-full transition focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep focus-visible:ring-accent-ice
        ${selected ? "ring-2 ring-offset-2 ring-offset-bg-deep ring-text-primary" : "ring-1 ring-white/20"}`}
    />
  );
}
