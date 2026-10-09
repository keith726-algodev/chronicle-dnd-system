export default function SegmentListItem({
  title,
  previewText,
  tag,
  onPress,
  selected = false,
  dashed = false,
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={`flex min-h-[44px] w-full flex-col items-start gap-0.5 rounded-token-card border
        px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-accent-ice focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep
        ${dashed
          ? "border-dashed border-text-muted/50 text-text-muted hover:border-accent-ice hover:text-accent-ice"
          : selected
            ? "border-accent-ice/60 bg-grad-tile"
            : "border-white/10 bg-grad-tile hover:border-white/20"}`}
    >
      <span className="text-size-2 font-semibold text-text-primary">{title}</span>
      {previewText && (
        <span className="line-clamp-1 text-size-1 text-text-muted">{previewText}</span>
      )}
      {tag && (
        <span className="mt-1 rounded-full bg-bg-deep px-2 py-0.5 text-size-1 text-text-muted">
          {tag}
        </span>
      )}
    </button>
  );
}
