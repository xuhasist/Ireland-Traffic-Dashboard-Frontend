type Props = {
  isLoaded: boolean;
};

export default function LoadingOverlay({ isLoaded }: Props) {
  return (
    <>
      <div className={`loading-overlay ${isLoaded ? "" : "active"}`}>
        <div className="spinner"></div>
        <p>Loading traffic data...</p>
      </div>
    </>
  );
}
