import { FC } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const PaginationComp: FC<Props> = ({ currentPage, totalPages, onPageChange, loading }) => {
  return (
    <div className="d-flex justify-content-center my-3">
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
