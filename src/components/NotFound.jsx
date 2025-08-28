import { Link } from "react-router-dom";
import notfoundlogo from "./../images/notfound.svg";
import "./NotFound.css";

const NotFound = ({ error, resetErrorBoundary }) => {
  return (
    <div className="center">
      <img
        src={notfoundlogo}
        alt={notfoundlogo}
        height="300"
        className="center"
      ></img>
      <br />
      {error && resetErrorBoundary && (
        <div role="alert">
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      )}
      <br />
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
