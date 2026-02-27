import type { TrafficListItem } from "../legacy/types";

type Props = {
  items: TrafficListItem[];
  isLoading?: boolean;
};

function capitalizeFirst(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function TrafficItems({ items, isLoading }: Props) {
  if (isLoading || items.length === 0) {
    return null;
  }

  return (
    <>
      {items.map((item) => {
        const jamWidth = (item.jamLevel / 10) * 100;

        return (
          <div className="traffic-item" key={item.name}>
            <div className="street-info">
              <div className="street-name">{item.name}</div>
              <div className="jam-indicator">
                <div className="jam-bar">
                  <div
                    className={`jam-fill ${item.status}`}
                    style={{ width: `${jamWidth}%` }}
                  ></div>
                </div>
                <span className="jam-text">Jam: {item.jamLevel}/10</span>
              </div>
            </div>
            <div className="traffic-info">
              <span className="speed">{item.speed} km/h</span>
              <span className={`status-badge status-${item.status}`}>
                {capitalizeFirst(item.status)}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
