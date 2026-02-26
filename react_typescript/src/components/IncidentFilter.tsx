import { useEffect, useMemo, useState } from "react";
import { incidentRoadHandler, incidentTypeHandler } from "../legacy/dashboard";

type Incident = {
  severity: string | null;
  type: string | null;
  // 其他欄位不用寫也沒關係（先最小化）
};

type IncidentFilters = {
  type: string; // "all" 或某個 type
};

type Props = {
  incidents: Incident[];
  //filters: IncidentFilters;
  //setFilters: React.Dispatch<React.SetStateAction<IncidentFilters>>;
};

export default function IncidentFilter({ incidents }: Props) {
  const [filters, setFilters] = useState({ type: "all" });

  // 只有 incidents 變了才重新算，不然沿用舊的 uniqueTypes，不會觸發 re-render
  const uniqueTypes = useMemo((): string[] => {
    //console.log("Calculating unique incident types from incidents:", incidents);
    const base = (incidents ?? []).filter((d) => d.severity !== "Unknown");
    return Array.from(
      new Set(base.map((d) => d.type).filter(Boolean)),
    ) as string[];
  }, [incidents]);

  // dependency 改變 → React 會在「那次 render 完成後」重新執行這個 effect
  useEffect(() => {
    //console.log("Available incident types changed:", uniqueTypes);
    const current = filters.type ?? "all";
    const stillValid = current === "all" || uniqueTypes.includes(current);
    if (!stillValid) {
      setFilters({ type: "all" });
    }
  }, [uniqueTypes, filters.type, setFilters]);

  return (
    <>
      <select
        id="incidentTypeFilter"
        className="sort-dropdown"
        value={filters.type ?? "all"}
        onChange={(e) => {
          const next = e.target.value;
          setFilters({ type: next });
          incidentTypeHandler(next);
        }}
      >
        <option value="all">All types</option>
        {uniqueTypes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <input
        id="incidentRoadSearch"
        className="text-input"
        type="text"
        placeholder="Search road name…"
        aria-label="Search incident road name"
        onChange={(e) => incidentRoadHandler(e.target.value)}
      />
    </>
  );
}
