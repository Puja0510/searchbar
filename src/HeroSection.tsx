// HeroSection.tsx
import React from "react";
import { Button, Badge } from "react-bootstrap";

interface Props {
  scrollToProducts: () => void;
}

const HeroSection: React.FC<Props> = ({ scrollToProducts }) => {
  const categories = ["Top", "Shoes", "Jeans", "Dress", "Winter"];

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        backgroundImage:
          "url('https://media.istockphoto.com/id/1473362719/video/gradient-multilayer-glass-background-3d-rendering.jpg?s=640x640&k=20&c=ml0TEGU516d-30r8MsegINCae2Nh8ysDQ3t4tzj4TEY=')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
        position: "relative",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        {categories.map((cat) => (
          <Badge
            key={cat}
            bg="dark"
            className="me-2"
            style={{ fontSize: "1rem", cursor: "pointer" }}
          >
            {cat}
          </Badge>
        ))}
      </div>
      <h1 className="mb-3 fw-bold">Winter is Here!</h1>
      <Button variant="primary" size="lg" onClick={scrollToProducts}>
        Shop Now
      </Button>
    </div>
  );
};

export default HeroSection;
