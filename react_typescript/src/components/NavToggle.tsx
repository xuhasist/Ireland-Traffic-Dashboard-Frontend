import { dataModeHandler } from "../legacy/dashboard";

type Props = {
  isLiveUpdate: boolean;
};

export default function NavToggle({ isLiveUpdate }: Props) {
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
          onChange={() => dataModeHandler(!isLiveUpdate)}
        />
        <span className="slider"></span>
      </label>
    </>
  );
}
