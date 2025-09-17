import { FC } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComp: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center my-3">
      <ButtonGroup>
        {/* First Page */}
        <Button
          variant="outline-primary"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline-primary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Prev
        </Button>

        {/* Current Page Display */}
        <Button variant="primary" disabled>
          {currentPage} / {totalPages}
        </Button>

        {/* Next Page */}
        <Button
          variant="outline-primary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>

        {/* Last Page */}
        <Button
          variant="outline-primary"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default PaginationComp;
