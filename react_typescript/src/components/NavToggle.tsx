type Props = {
  isLiveUpdate: boolean;
  onChange: (nextIsLive: boolean) => void;
};

export default function NavToggle({ isLiveUpdate, onChange }: Props) {
  return (
    <>
      <span className="toggle-label" id="dataModeLabel">
        Live Data
      </span>
      <label className="switch" title="Toggle Live API / Mock Data">
        <input
          type="checkbox"
          id="dataModeToggle"
          checked={isLiveUpdate}
          onChange={() => onChange(!isLiveUpdate)}
        />
        <span className="slider"></span>
      </label>
    </>
  );
}
