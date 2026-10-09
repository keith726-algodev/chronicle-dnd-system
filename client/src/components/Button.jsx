import Icon from "./Icon.jsx";

const VARIANTS = {
  primary:
    "bg-grad-accent text-bg-deep hover:brightness-95 focus-visible:ring-accent-ice",
  ghost:
    "bg-transparent text-text-primary hover:bg-white/10 focus-visible:ring-accent-ice",
  danger:
    "bg-transparent text-red-300 hover:bg-red-500/10 focus-visible:ring-red-300",
};

export default function Button({
  label,
  icon,
  iconOnly = false,
  variant = "primary",
  onPress,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
}) {
  return (
    <button
      type={type}
      onClick={onPress}
      disabled={disabled}
      aria-label={iconOnly ? ariaLabel || label : undefined}
      className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2
        rounded-token-card px-4 py-2 text-size-2 font-medium transition
        disabled:cursor-not-allowed disabled:opacity-50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-offset-bg-deep ${VARIANTS[variant]}`}
    >
      {icon && <Icon name={icon} size={16} />}
      {!iconOnly && label}
    </button>
  );
}
