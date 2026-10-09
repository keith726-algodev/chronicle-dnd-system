import SegmentListItem from "./SegmentListItem.jsx";

export default function SegmentList({ segments, selectedId, onSelect, onAddNew }) {
  return (
    <div className="flex flex-col gap-2 p-4">
      {segments.map((seg) => (
        <SegmentListItem
          key={seg.id}
          title={seg.title}
          previewText={seg.previewText}
          tag={seg.tags?.[0]}
          selected={seg.id === selectedId}
          onPress={() => onSelect(seg)}
        />
      ))}
      <SegmentListItem title="Add segment" dashed onPress={onAddNew} />
    </div>
  );
}
