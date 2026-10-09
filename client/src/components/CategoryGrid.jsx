import CategoryTile from "./CategoryTile.jsx";

/**
 * CategoryGrid — responsive column count: 2 up on mobile, 3 on tablet,
 * 4 on desktop, matching the breakpoints in docs/03-design-system.md.
 */
export default function CategoryGrid({ categories, onTileOpen, onAddNew, onTileEdit }) {
  return (
    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-6 lg:grid-cols-4">
      {categories.map((cat) => (
        <CategoryTile
          key={cat.id}
          icon={cat.icon}
          title={cat.name}
          accentColor={cat.accentColor}
          segmentCount={cat.segmentCount}
          onPress={() => onTileOpen(cat)}
          onLongPress={onTileEdit ? () => onTileEdit(cat) : undefined}
        />
      ))}
      <CategoryTile icon="plus" title="New category" dashed onPress={onAddNew} />
    </div>
  );
}
