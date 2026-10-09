import {
  Axe,
  Flag,
  Users,
  Map,
  ScrollText,
  BookOpen,
  Plus,
  Settings as SettingsIcon,
  ChevronLeft,
  Search,
  Pencil,
  Check,
  X,
  Trash2,
  Sparkles,
} from "lucide-react";

// Maps a short token (stored on categories as `icon`) to a lucide component.
// Keeping this list small and named is deliberate: it is the set of icons a
// user can choose from in the Composer, not an open-ended icon picker.
const ICONS = {
  axe: Axe,
  flag: Flag,
  users: Users,
  map: Map,
  scroll: ScrollText,
  book: BookOpen,
  plus: Plus,
  settings: SettingsIcon,
  back: ChevronLeft,
  search: Search,
  edit: Pencil,
  check: Check,
  close: X,
  trash: Trash2,
  sparkles: Sparkles,
};

export const ICON_NAMES = Object.keys(ICONS);

export default function Icon({ name, size = 18, color, className = "", ...rest }) {
  const Cmp = ICONS[name] || BookOpen;
  return (
    <Cmp
      size={size}
      color={color}
      className={className}
      aria-hidden="true"
      {...rest}
    />
  );
}
