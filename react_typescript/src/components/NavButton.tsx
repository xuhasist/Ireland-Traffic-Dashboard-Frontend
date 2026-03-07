type Props = {
  isAutoUpdate: boolean;
  onRefresh: () => void;
  onToggleAutoUpdate: () => void;
};

export default function NavButton({
  isAutoUpdate,
  onRefresh,
  onToggleAutoUpdate,
}: Props) {
  return (
    <>
      <button className="btn" onClick={onRefresh}>
        <span className="icon">🔄</span>
        <span className="text">Refresh</span>
      </button>
      <button className="btn btn-primary" onClick={onToggleAutoUpdate}>
        <span className="icon">{isAutoUpdate ? "⏸️" : "▶️"}</span>
        <span className="text">
          {isAutoUpdate ? "Stop Auto-Update" : "Start Auto-Update"}
        </span>
      </button>
    </>
  );
}
