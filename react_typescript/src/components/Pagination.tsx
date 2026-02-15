type Kind = "traffic" | "incident";

type Props = {
  kind: Kind;
  page: number;
  totalPages: number;
  disabled?: boolean;
  onPrev: () => void;
  onNext: () => void;
};

function ids(kind: Kind) {
  return kind === "traffic"
    ? {
        prevBtn: "trafficPrevPage",
        nextBtn: "trafficNextPage",
        currentPage: "trafficCurrentPage",
        totalPages: "trafficTotalPages",
        wrapperClass: "traffic-pagination",
      }
    : {
        prevBtn: "incidentPrevPage",
        nextBtn: "incidentNextPage",
        currentPage: "incidentCurrentPage",
        totalPages: "incidentTotalPages",
        wrapperClass: "incident-pagination",
      };
}

export default function Pagination({
  kind,
  page,
  totalPages,
  disabled = false,
  onPrev,
  onNext,
}: Props) {
  const {
    prevBtn,
    nextBtn,
    currentPage,
    totalPages: totalPagesId,
    wrapperClass,
  } = ids(kind);

  return (
    <div className={`pagination ${wrapperClass}`}>
      <button
        className="pagination-btn"
        id={prevBtn}
        onClick={onPrev}
        disabled={disabled || page <= 1}
      >
        ← Prev
      </button>
      <span className="pagination-info">
        Page <span id={currentPage}>{page}</span> of{" "}
        <span id={totalPagesId}>{totalPages}</span>
      </span>
      <button
        className="pagination-btn"
        id={nextBtn}
        onClick={onNext}
        disabled={disabled || page >= totalPages}
      >
        Next →
      </button>
    </div>
  );
}
