import Icon from "./Icon.jsx";

export default function CategoryTile({
  icon,
  title,
  accentColor,
  segmentCount,
  onPress,
  onLongPress,
  dashed = false,
}) {
  let pressTimer;
  const startPress = () => {
    if (!onLongPress) return;
    pressTimer = setTimeout(onLongPress, 500);
  };
  const cancelPress = () => clearTimeout(pressTimer);

  return (
    <button
      type="button"
      onClick={onPress}
      onMouseDown={startPress}
      onMouseUp={cancelPress}
      onMouseLeave={cancelPress}
      onTouchStart={startPress}
      onTouchEnd={cancelPress}
      className={`group flex min-h-[44px] aspect-square flex-col items-center justify-center gap-2
        rounded-token-card border p-4 text-center transition
        hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-accent-ice focus-visible:ring-offset-2
        focus-visible:ring-offset-bg-deep
        ${dashed
          ? "border-dashed border-text-muted/50 text-text-muted hover:border-accent-ice hover:text-accent-ice"
          : "border-white/10 bg-grad-tile text-text-primary"}`}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={!dashed ? { backgroundImage: `linear-gradient(135deg, ${accentColor}55, ${accentColor}14)` } : undefined}
      >
        <Icon name={icon} size={20} color={!dashed ? accentColor : undefined} />
      </span>
      <span className="text-size-2 font-semibold leading-tight">{title}</span>
      {!dashed && (
        <span className="text-size-1 text-text-muted">
          {segmentCount} {segmentCount === 1 ? "segment" : "segments"}
        </span>
      )}
    </button>
  );
}
