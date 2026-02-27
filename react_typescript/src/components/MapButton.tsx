type Props = {
  onCenterMap: () => void;
};

export default function MapButton({ onCenterMap }: Props) {
  return (
    <>
      <button className="map-btn" id="centerMapBtn" onClick={onCenterMap}>
        <span>📍</span>
      </button>
    </>
  );
}
