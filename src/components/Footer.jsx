import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footerBC border-top footer" bg="light" variant="light">
      <div className="footer-copyright text-center py-3">
        <p>
          © {new Date().getFullYear()} :{" "}
          <Link
            to={"/"}
            className="nav-link"
            style={{ display: "contents", padding: 0 }}
          >
            Pritam Stock
          </Link>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
