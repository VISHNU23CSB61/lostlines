import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
    const token = localStorage.getItem("token");
    return (
        <nav className="navbar">
            <div className="logo">
                <h2>LostLines</h2>
                <span>Reconnect people with what matters.</span>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/about">About</Link>

            </div>
            <div className="nav-user">
                {
                    token ?
                    <button
                        className="primary-btn"
                        onClick={() => {

                            localStorage.removeItem("token");
                            localStorage.removeItem("user");

                            window.location.href="/login";

                        }}
                    >

                        Logout

                    </button>

                    :

                    <Link
                        to="/login"
                        className="primary-btn"
                    >

                        Login

                    </Link>

                }

            </div>

        </nav>

    );

}

export default Navbar;