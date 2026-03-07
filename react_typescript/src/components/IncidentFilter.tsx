import { useEffect, useMemo } from "react";

type Incident = {
  severity: string | null;
  type: string | null;
};

type Props = {
  incidents: Incident[];
  selectedType: string;
  roadQuery: string;
  onTypeChange: (type: string) => void;
  onRoadQueryChange: (query: string) => void;
};

export default function IncidentFilter({
  incidents,
  selectedType,
  roadQuery,
  onTypeChange,
  onRoadQueryChange,
}: Props) {
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
      onTypeChange("all");
    }
  }, [selectedType, uniqueTypes, onTypeChange]);

  return (
    <>
      <select
        id="incidentTypeFilter"
        className="sort-dropdown"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
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
        value={roadQuery}
        onChange={(e) => onRoadQueryChange(e.target.value)}
      />
    </>
  );
}
