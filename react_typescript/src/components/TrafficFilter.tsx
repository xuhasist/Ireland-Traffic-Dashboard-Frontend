import type { SortOption } from "../types";

type Props = {
  selectedSort: SortOption;
  onChange: (sort: SortOption) => void;
};

export default function TrafficFilter({ selectedSort, onChange }: Props) {
  return (
    <select
      id="sort-dropdown"
      className="sort-dropdown"
      value={selectedSort}
      onChange={(e) => onChange(e.target.value as SortOption)}
    >
      <option value="worst">Worst First</option>
      <option value="best">Best First</option>
      <option value="alphabetical">A-Z</option>
    </select>
  );
}
