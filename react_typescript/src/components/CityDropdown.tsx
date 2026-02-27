import { cityChangeHandler } from "../legacy/dashboard";
import { CONFIG } from "../legacy/config";

type Props = {
  currentCity: string | null;
};

export default function CityDropdown({ currentCity }: Props) {
  if (!currentCity) return null;

  const cities = Object.keys(CONFIG.cities);

  return (
    <>
      <span className="time-label">City:</span>

      <select
        className="time-dropdown"
        id="cityDropdown"
        value={currentCity}
        onChange={(e) => cityChangeHandler(e.target.value)}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </>
  );
}
