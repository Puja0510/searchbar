import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { CancelTokenSource } from "axios";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import PaginationComp from "./Pagination";
import Loader from "./Loader";
import { Container, Row, Col, Alert } from "react-bootstrap";
import "./App.css";

export interface Pagination {
  currentPage: number;
  totalPages: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  msrp?: number;
  thumbnailImageUrl: string;
}

const SITE_ID = "scmq7n";

function App() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("jeans");
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(
    async (term: string, page = 1, cancelToken?: CancelTokenSource) => {
      if (!term.trim()) return;

      setLoading(true);
      setError("");

      try {
        const res = await axios.get(
          "https://api.searchspring.net/api/search/search.json",
          {
            params: { siteId: SITE_ID, q: term, resultsFormat: "native", page },
            cancelToken: cancelToken?.token,
          }
        );

        const data = res.data;

        setProducts(data.results || []);
        setPagination({
          currentPage: data.pagination?.currentPage || 1,
          totalPages: data.pagination?.totalPages || 1,
        });

        if (!data.results || data.results.length === 0) {
          setError("No results found.");
        }
      } catch (err: any) {
        if (!axios.isCancel(err)) {
          console.error(err);
          setError("Failed to fetch results. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial + whenever searchTerm or page changes
  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchProducts(searchTerm, pagination.currentPage, source);
    return () => source.cancel();
  }, [searchTerm, pagination.currentPage, fetchProducts]);

  const handleSearch = () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }
    setPagination((p) => ({ ...p, currentPage: 1 }));
    setSearchTerm(query);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination((p) => ({ ...p, currentPage: page }));
  };

  // ✅ Show full screen loader until data ready
  if (loading) {
    return <Loader message="Loading products, please wait..." />;
  }

  return (
    <div
      className="app-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Sticky Header */}
      <Row
        className="w-100 align-items-center px-3 py-2 bg-white bg-opacity-90 shadow-sm sticky-top"
        style={{ zIndex: 1000 }}
      >
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center">
            <img
              src="https://img.icons8.com/fluency/48/000000/search.png"
              alt="logo"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            <h2 className="fw-bold mb-0" style={{ fontSize: "1.5rem" }}>
              SearchDemo
            </h2>
          </div>
          <div style={{ width: "300px", minWidth: "200px" }}>
            <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
          </div>
        </div>
      </Row>

      {/* Main Content */}
      <Container
        className="flex-grow-1 d-flex flex-column justify-content-start align-items-center py-4"
        style={{ maxWidth: "1200px", position: "relative", minHeight: "600px" }}
      >
        {error && <Alert variant="warning">{error}</Alert>}

        {!error && products.length > 0 && (
          <>
            <PaginationComp
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
            <Row className="justify-content-center w-100 mb-5">
              {products.map((product) => (
                <Col
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="d-flex mb-4"
                >
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
            <PaginationComp
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Container>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          height: "150px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontWeight: "bold",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <div style={{ zIndex: 2 }}>
          © 2025 SearchDemo. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
