import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useContext(AuthContext);

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 40px",
                background: "#1e293b",
                color: "white"
            }}
        >
            <div>
                <Link
                    to="/"
                    style={{ color: "white", marginRight: "20px" }}
                >
                    Home
                </Link>
                <Link
                    to="/about"
                    style={{ color: "white", marginRight: "20px" }}
                >
                    About
                </Link>
                {
                    user && (
                        <Link
                            to="/dashboard"
                            style={{ color: "white" }}
                        >
                            Dashboard
                        </Link>
                    )
                }
            </div>
            <div>
                {
                    user ?
                    (
                        <>
                            <span
                                style={{
                                    marginRight: "20px"
                                }}
                            >
                                Welcome, {user.name}
                            </span>
                            <button
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </>
                    )
                    :
                    (
                        <>
                            <Link
                                to="/login"
                                style={{
                                    color: "white",
                                    marginRight: "20px"
                                }}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                style={{
                                    color: "white"
                                }}
                            >
                                Register
                            </Link>
                        </>
                    )
                }
            </div>
        </nav>
    );
}

export default Navbar;