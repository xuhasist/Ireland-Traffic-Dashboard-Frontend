const items = [
  { tone: "good", label: "Good (0-4)" },
  { tone: "moderate", label: "Moderate (4-7)" },
  { tone: "heavy", label: "Heavy (7-10)" },
];

export default function MapLegend() {
  return (
    <>
      <div className="map-legend">
        {items.map((item) => (
          <div className="legend-item" key={item.tone}>
            <span className={`legend-color ${item.tone}`}></span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
