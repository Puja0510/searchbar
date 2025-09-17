import React from "react";
import { Card, Badge } from "react-bootstrap";

interface Props {
  product: Product;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  msrp?: number;
  thumbnailImageUrl: string;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const isDiscounted = product.msrp && product.msrp > product.price;
  const discountPercent = isDiscounted
    ? Math.round(((product.msrp! - product.price) / product.msrp!) * 100)
    : 0;

  return (
    <Card
      className="h-100 shadow-sm"
      style={{
        width: "100%",
        minHeight: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "8px",
      }}
    >
      {/* Image */}
      <div style={{ textAlign: "center", padding: "10px", position: "relative" }}>
        {isDiscounted && (
          <Badge
            bg="danger"
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              fontSize: "0.75rem",
              padding: "5px 8px",
            }}
          >
            -{discountPercent}%
          </Badge>
        )}
        <Card.Img
          variant="top"
          src={product.thumbnailImageUrl}
          alt={product.name}
          style={{ height: "180px", objectFit: "contain" }}
        />
      </div>

      {/* Product Info */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title style={{ fontSize: "1rem", minHeight: "40px" }}>
          {product.name}
        </Card.Title>
        <div className="mt-2 d-flex align-items-center">
          <span style={{ fontWeight: "bold", fontSize: "1rem", color: "#007bff" }}>
            ${product.price}
          </span>
          {isDiscounted && (
            <span
              style={{
                textDecoration: "line-through",
                color: "gray",
                marginLeft: "10px",
                fontSize: "0.9rem",
              }}
            >
              ${product.msrp}
            </span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
