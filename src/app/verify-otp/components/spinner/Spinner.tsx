import Spinner from "react-bootstrap/Spinner";

const Spin = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ height: "1rem", width: "1rem", borderWidth: "1px" }}
    />
  );
};

export default Spin;
