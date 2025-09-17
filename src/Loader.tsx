import { Spinner } from "react-bootstrap";

interface LoaderProps {
  message?: string;
}

function Loader({ message = "Loading, please wait..." }: LoaderProps) {
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        minHeight: "400px",
      }}
    >
      <Spinner animation="border" variant="primary" />
      <p className="mt-3 fw-semibold">{message}</p>
    </div>
  );
}

export default Loader;
