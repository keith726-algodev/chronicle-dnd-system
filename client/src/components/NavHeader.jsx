import Breadcrumb from "./Breadcrumb.jsx";
import Button from "./Button.jsx";

/**
 * NavHeader — one component, reused on every screen (Home, Branch, Entry,
 * Composer, Settings) rather than redrawn per screen. See the component
 * breakdown in docs/02-mockup.md.
 *
 * props:
 *  - breadcrumb: [{ label, onPress }]
 *  - actions: [{ icon, label, onPress }]
 */
export default function NavHeader({ breadcrumb, actions = [] }) {
  return (
    <header className="flex min-h-[56px] items-center justify-between gap-3 bg-grad-header px-4 py-3 sm:px-6">
      <Breadcrumb path={breadcrumb} />
      <div className="flex items-center gap-1">
        {actions.map((action) => (
          <Button
            key={action.label}
            icon={action.icon}
            iconOnly
            variant="ghost"
            aria-label={action.label}
            onPress={action.onPress}
          />
        ))}
      </div>
    </header>
  );
}
