import type { IncidentListItem } from "../types";

type Props = {
  items: IncidentListItem[];
  isLoading?: boolean;
};

export default function IncidentItems({ items, isLoading }: Props) {
  if (isLoading || items.length === 0) {
    return null;
  }

  return (
    <>
      {items.map((item, index) => (
        <div className="incident-item" key={index}>
          <div className="incident-icon">{item.icon}</div>
          <div className="incident-details">
            <div className="incident-type">{item.type}</div>
            <div className="incident-location">{item.location}</div>
            <div className="incident-time">
              {item.time} • {item.delay}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
