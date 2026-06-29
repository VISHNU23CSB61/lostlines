import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                background: "#1e3a8a"
            }}
        >
            <Link
                style={{ color: "white" }}
                to="/"
            >
                Home
            </Link>

            <Link
                style={{ color: "white" }}
                to="/dashboard"
            >
                Dashboard
            </Link>

            <Link
                style={{ color: "white" }}
                to="/about"
            >
                About
            </Link>
        </nav>
    );
}

export default Navbar;