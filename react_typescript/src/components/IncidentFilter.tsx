import { useEffect, useMemo, useState } from "react";
import { incidentRoadHandler, incidentTypeHandler } from "../legacy/dashboard";

type Incident = {
  severity: string | null;
  type: string | null;
};

type Props = {
  incidents: Incident[];
};

export default function IncidentFilter({ incidents }: Props) {
  const [selectedType, setSelectedType] = useState("all");

  // 只有 incidents 變了才重新算，不然沿用舊的 uniqueTypes，不會觸發 re-render
  const uniqueTypes = useMemo(
    () =>
      Array.from(
        new Set(
          (incidents ?? [])
            .filter((incident) => incident.severity !== "Unknown")
            .map((incident) => incident.type)
            .filter((type): type is string => Boolean(type)),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [incidents],
  );

  // dependency 改變 → React 會在「那次 render 完成後」重新執行這個 effect
  useEffect(() => {
    const stillValid =
      selectedType === "all" || uniqueTypes.includes(selectedType);

    if (!stillValid) {
      setSelectedType("all");
      incidentTypeHandler("all");
    }
  }, [selectedType, uniqueTypes]);

  return (
    <>
      <select
        id="incidentTypeFilter"
        className="sort-dropdown"
        value={selectedType}
        onChange={(e) => {
          const nextType = e.target.value;
          setSelectedType(nextType);
          incidentTypeHandler(nextType);
        }}
      >
        <option value="all">All types</option>
        {uniqueTypes.map((type) => (
          <option key={type} value={type}>
            {type}
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
