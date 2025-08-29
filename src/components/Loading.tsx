import { Spinner } from "react-bootstrap";

const Loading = ({}) => {
  return (
    <div className="text-center py-3">
      <Spinner animation="border" role="status" variant="info" />
    </div>
  );
};

export default Loading;
