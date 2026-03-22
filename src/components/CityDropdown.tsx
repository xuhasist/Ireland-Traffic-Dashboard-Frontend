//import { CONFIG } from "../legacy/config";
//component 只負責 render，state 由父 component 管理

type Props = {
  currentCity: string | null;
  onChange: (city: string) => void;
  cities: string[];
};

export default function CityDropdown({ currentCity, onChange, cities }: Props) {
  if (!currentCity) return null;

  //const cities = Object.keys(CONFIG.cities);
  //["Dublin", "Cork", "Galway", "Limerick", "Waterford"]

  return (
    <>
      <span className="time-label">City:</span>

      <select
        className="time-dropdown"
        id="cityDropdown"
        value={currentCity}
        onChange={(e) => onChange(e.target.value)}
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
