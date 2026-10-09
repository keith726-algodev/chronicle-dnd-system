export default function Breadcrumb({ path }) {
  // path: [{ label, onPress }]
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-size-2 text-text-muted">
        {path.map((step, i) => {
          const isLast = i === path.length - 1;
          return (
            <li key={`${step.label}-${i}`} className="flex items-center gap-1">
              {step.onPress && !isLast ? (
                <button
                  type="button"
                  onClick={step.onPress}
                  className="rounded px-1 text-text-primary hover:text-accent-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ice"
                >
                  {step.label}
                </button>
              ) : (
                <span className={isLast ? "px-1 text-text-primary" : "px-1"}>
                  {step.label}
                </span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
