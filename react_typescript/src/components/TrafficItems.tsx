import type { TrafficListItem } from "../legacy/types";

type Props = {
  items: TrafficListItem[];
  isLoading?: boolean;
};

function capitalizeFirst(s: string): string {
  if (!s) return ""; // all falsy values: false, 0, "", null, undefined, NaN
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function TrafficItems({ items, isLoading }: Props) {
  if (isLoading || !items || items.length === 0) {
    return null;
    /* return (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="traffic-item" key={i}>
            <div className="street-info">
              <div className="street-name">Loading…</div>
              <div className="jam-indicator">
                <div className="jam-bar">
                  <div className="jam-fill good" style={{ width: "0%" }}></div>
                </div>
                <span className="jam-text">Jam: --/10</span>
              </div>
            </div>
            <div className="traffic-info">
              <span className="speed">-- km/h</span>
              <span className="status-badge status-good">--</span>
            </div>
          </div>
        ))}
      </>
    ); */
  }

  /* if (!items || items.length === 0) {
    return (
      <div className="traffic-item" key="no-data">
        <div className="street-info">
          <div className="street-name">No traffic data</div>
          <div className="jam-indicator">
            <div className="jam-bar">
              <div className="jam-fill good" style={{ width: "0%" }}></div>
            </div>
            <span className="jam-text">Jam: --/10</span>
          </div>
        </div>
        <div className="traffic-info">
          <span className="speed">-- km/h</span>
          <span className="status-badge status-good">--</span>
        </div>
      </div>
    );
  } */

  return (
    <>
      {items.map((item, index) => {
        const jamWidth = (item.jamLevel / 10) * 100;
        return (
          <div className="traffic-item" key={index}>
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
