import { FC } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
  searchTerm?: string; // new prop
}

const PaginationComp: FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  loading,
  searchTerm,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center my-3 w-100">
      {/* Left: searched term */}
      <div style={{ fontWeight: "bold" }}>
        Showing results for: <span className="text-primary">{searchTerm || "All"}</span>
      </div>

      {/* Right: pagination buttons */}
      <ButtonGroup>
        <Button
          aria-label="First page"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1 || loading}
        >
          ⏮ First
        </Button>
        <Button
          aria-label="Previous page"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
        >
          ◀ Previous
        </Button>
        <Button disabled>
          {currentPage} / {totalPages}
        </Button>
        <Button
          aria-label="Next page"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
        >
          Next ▶
        </Button>
        <Button
          aria-label="Last page"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || loading}
        >
          Last ⏭
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PaginationComp;
