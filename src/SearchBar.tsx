import React from "react";

interface Props {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
  loading?: boolean;
}

const SearchBar: React.FC<Props> = ({ query, setQuery, onSearch, loading }) => {
  return (
    <form
      className="d-flex search-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="form-control me-2 search-input"
        aria-label="Search products"
        disabled={loading}
      />
      <button type="submit" className="btn btn-primary search-button" disabled={loading}>
        {loading ? "..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
