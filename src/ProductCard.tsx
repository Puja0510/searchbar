import React from "react";
import { Card } from "react-bootstrap";

export interface Product {
  id: string;
  name: string;
  price: number;
  msrp?: number;
  thumbnailImageUrl: string;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = React.memo(({ product }) => {
  return (
    <Card className="h-100 shadow-sm product-card">
      <div style={{ textAlign: "center", padding: "10px" }}>
        <Card.Img
          variant="top"
          src={product.thumbnailImageUrl}
          alt={product.name}
          style={{ height: "180px", objectFit: "contain" }}
        />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title style={{ fontSize: "1rem", minHeight: "40px" }}>
          {product.name}
        </Card.Title>
        <div className="mt-2">
          <span style={{ fontWeight: "bold", fontSize: "1rem" }}>${product.price}</span>
          {product.msrp && product.msrp > product.price && (
            <span
              style={{
                textDecoration: "line-through",
                color: "gray",
                marginLeft: "10px",
              }}
            >
              ${product.msrp}
            </span>
          )}
        </div>
      </Card.Body>
    </Card>
  );
});

export default ProductCard;
