import Icon from "./Icon.jsx";

export default function Tag({ text, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-size-1 text-text-muted">
      {text}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove tag ${text}`}
          className="ml-1 rounded-full p-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice"
        >
          <Icon name="close" size={10} />
        </button>
      )}
    </span>
  );
}
