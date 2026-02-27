import { cityChangeHandler } from "../legacy/dashboard";
import { CONFIG } from "../legacy/config";

type Props = {
  currentCity: string | null;
};

export default function CityDropdown({ currentCity }: Props) {
  if (!currentCity) return;
  const cities = Object.keys(CONFIG.cities);
  /* if (currentCity === "" && cities.length > 0) {
    cityChangeHandler(cities[0]);
  } */

  return (
    <>
      <span className="time-label">City:</span>

      <select
        className="time-dropdown"
        id="cityDropdown"
        value={currentCity}
        onChange={(e) => cityChangeHandler(e.target.value)}
      >
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
}
