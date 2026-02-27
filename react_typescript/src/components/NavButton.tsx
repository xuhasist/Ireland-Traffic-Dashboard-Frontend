import { autoUpdateHandler, refreshHandler } from "../legacy/dashboard";

type Props = {
  isAutoUpdate: boolean;
};

export default function NavButton({ isAutoUpdate }: Props) {
  return (
    <>
      <button className="btn" onClick={() => refreshHandler()}>
        <span className="icon">🔄</span>
        <span className="text">Refresh</span>
      </button>
      <button
        className="btn btn-primary"
        onClick={() => autoUpdateHandler(isAutoUpdate)}
      >
        <span className="icon">{isAutoUpdate ? "⏸️" : "▶️"}</span>
        <span className="text">
          {isAutoUpdate ? "Stop Auto-Update" : "Start Auto-Update"}
        </span>
      </button>
    </>
  );
}
