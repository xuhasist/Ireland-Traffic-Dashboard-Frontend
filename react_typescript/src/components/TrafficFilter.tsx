import { useState } from "react";
import { trafficSortHandler } from "../legacy/dashboard";

type SortOption = "worst" | "best" | "alphabetical";

export default function TrafficFilter() {
  const [selectedSort, setSelectedSort] = useState<SortOption>("worst"); // dropdown目前選到

  return (
    <>
      <select
        id="sort-dropdown"
        className="sort-dropdown"
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value as SortOption)}
      >
        <option value="worst">Worst First</option>
        <option value="best">Best First</option>
        <option value="alphabetical">A-Z</option>
      </select>
      <button
        className="filter-btn"
        onClick={() => trafficSortHandler(selectedSort)}
      >
        <span className="filter-icon">🔍</span>
        Sort
      </button>
    </>
  );
}
