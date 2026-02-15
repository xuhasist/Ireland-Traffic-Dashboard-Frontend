import type { IncidentListItem } from "../legacy/types";

type Props = {
  items: IncidentListItem[];
  isLoading?: boolean;
};

export default function IncidentItems({ items, isLoading }: Props) {
  if (isLoading || !items || items.length === 0) {
    return null;
  }
  return (
    <>
      {items.map((item) => (
        <div className="incident-item">
          <div className="incident-icon">{item.icon}</div>
          <div className="incident-details">
            <div className="incident-type">{item.type}</div>
            <div className="incident-location">{item.location}</div>
            <div className="incident-time">
              {item.time} • {item.delay} min delay
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
