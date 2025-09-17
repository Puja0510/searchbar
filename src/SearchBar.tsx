// SearchBar.tsx
import { FC } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
}

const SearchBar: FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
  return (
    <InputGroup>
      <Form.Control
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        style={{ borderRadius: "0.25rem 0 0 0.25rem" }}
      />
      <Button
        onClick={onSearch}
        variant="primary"
        style={{ borderRadius: "0 0.25rem 0.25rem 0" }}
      >
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
