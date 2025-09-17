import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import PaginationComp from "./Pagination";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import "./App.css"; // optional custom CSS for spacing

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
  const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async (term: string, page = 1) => {
    if (!term) return;
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`https://api.searchspring.net/api/search/search.json`, {
        params: {
          siteId: SITE_ID,
          q: term,
          resultsFormat: "native",
          page,
        },
      });

      const data = res.data;
      setProducts(data.results || []);
      setPagination({
        currentPage: data.pagination?.currentPage || 1,
        totalPages: data.pagination?.totalPages || 1,
      });

      if (!data.results || data.results.length === 0) {
        setError("No results found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results. Please try again.");
      setProducts([]);
      setPagination({ currentPage: 1, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm, pagination.currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, pagination.currentPage]);

  const handleSearch = () => {
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }
    setPagination({ currentPage: 1, totalPages: 1 });
    setSearchTerm(query);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination((p) => ({ ...p, currentPage: page }));
  };

  return (
    <div className="app-container">
      {/* Sticky Header */}
      <Row className="header sticky-top">
        <div className="d-flex align-items-center justify-content-between w-100 px-3">
          <div className="d-flex align-items-center">
            <img
              src="https://img.icons8.com/fluency/48/000000/search.png"
              alt="logo"
              className="logo"
            />
            <h2 className="site-name mb-0">SearchDemo</h2>
          </div>
          <div className="search-bar-wrapper">
            <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
          </div>
        </div>
      </Row>

      {/* Main Content */}
      <Container className="main-content py-4" style={{ maxWidth: "1200px" }}>
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
                <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex mb-4">
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

        {loading && (
          <div className="loader-container">
            <Spinner animation="border" variant="primary" className="mb-3" />
            <h5 className="text-muted">Please wait… loading</h5>
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-overlay" />
        <div className="footer-text">© 2025 SearchDemo. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default App;




// import { useState, useEffect } from "react";
// import axios from "axios";
// import SearchBar from "./SearchBar";
// import ProductCard from "./ProductCard";
// import PaginationComp from "./Pagination";
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

// export interface Product {
//   id: string;
//   name: string;
//   price: number;
//   msrp?: number;
//   thumbnailImageUrl: string;
// }

// export interface Pagination {
//   currentPage: number;
//   totalPages: number;
// }

// const SITE_ID = "scmq7n";

// function App() {
//   const [query, setQuery] = useState("");
//   const [searchTerm, setSearchTerm] = useState("jeans");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [pagination, setPagination] = useState<Pagination>({ currentPage: 1, totalPages: 1 });
//   const [loading, setLoading] = useState(false);
//   const [showLoader, setShowLoader] = useState(false);
//   const [error, setError] = useState("");

//   const fetchProducts = async (term: string, page = 1) => {
//     if (!term) return;
//     setLoading(true);
//     setShowLoader(true);
//     setError("");

//     try {
//       const res = await axios.get(`https://api.searchspring.net/api/search/search.json`, {
//         params: {
//           siteId: SITE_ID,
//           q: term,
//           resultsFormat: "native",
//           page,
//         },
//       });

//       const data = res.data;
//       setProducts(data.results || []);
//       setPagination({
//         currentPage: data.pagination?.currentPage || 1,
//         totalPages: data.pagination?.totalPages || 1,
//       });

//       if (!data.results || data.results.length === 0) {
//         setError("No results found.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch results. Please try again.");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setShowLoader(false), 300);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(searchTerm, pagination.currentPage);
//   }, [searchTerm, pagination.currentPage]);

//   const handleSearch = () => {
//     if (!query.trim()) {
//       setError("Please enter a search term.");
//       return;
//     }
//     setPagination((p) => ({ ...p, currentPage: 1 }));
//     setSearchTerm(query);
//   };

//   const handlePageChange = (page: number) => {
//     if (page < 1 || page > pagination.totalPages) return;
//     setPagination((p) => ({ ...p, currentPage: page }));
//   };

//   // Full-screen loader
//   if (showLoader) {
//     return (
//       <div
//         className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
//         style={{ backgroundColor: "#ffffff", zIndex: 9999 }}
//       >
//         <Spinner animation="border" variant="primary" className="mb-3" />
//         <h5 className="text-muted">Please wait… loading</h5>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         backgroundImage:
//           "url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1950&q=80')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
// {/* Sticky Header */}
// {/* Sticky Header */}
// <Row
//   className="w-100 align-items-center px-3 py-2 bg-white bg-opacity-90 shadow-sm sticky-top"
//   style={{ zIndex: 1000 }}
// >
//   <div className="d-flex align-items-center justify-content-between w-100">
//     {/* Left: Image + Text */}
//     <div className="d-flex align-items-center">
//       <img
//         src="https://img.icons8.com/fluency/48/000000/search.png"
//         alt="logo"
//         style={{ width: "30px", height: "30px", marginRight: "10px" }}
//       />
//       <h2 className="fw-bold mb-0" style={{ fontSize: "1.5rem" }}>
//         SearchDemo
//       </h2>
//     </div>

//     {/* Right: Search Bar */}
//     <div style={{ width: "300px", minWidth: "200px" }}>
//       <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
//     </div>
//   </div>
// </Row>



//       {/* Main Content */}
//       <Container
//         className="flex-grow-1 d-flex flex-column justify-content-start align-items-center py-4"
//         style={{ maxWidth: "1200px" }}
//       >
//         {error && <Alert variant="warning">{error}</Alert>}

//         {!error && products.length > 0 && (
//           <>
//             {/* Pagination Top */}
//             <PaginationComp
//               currentPage={pagination.currentPage}
//               totalPages={pagination.totalPages}
//               onPageChange={handlePageChange}
//             />

//             {/* Product Grid */}
//             <Row className="justify-content-center w-100 mb-5">
//               {products.map((product) => (
//                 <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex mb-4">
//                   <ProductCard product={product} />
//                 </Col>
//               ))}
//             </Row>

//             {/* Pagination Bottom */}
//             <PaginationComp
//               currentPage={pagination.currentPage}
//               totalPages={pagination.totalPages}
//               onPageChange={handlePageChange}
//             />
//           </>
//         )}
//       </Container>

//       <footer
//   style={{
//     width: "100%",
//     height: "150px",
//     backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "#fff",
//     fontWeight: "bold",
//     position: "relative",
//   }}
// >
//   {/* Optional overlay */}
//   <div
//     style={{
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       zIndex: 1,
//     }}
//   />
//   <div style={{ zIndex: 2 }}>
//     © 2025 SearchDemo. All rights reserved.
//   </div>
// </footer>

//     </div>
//   );
// }

// export default App;
