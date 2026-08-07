import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import {
    Sun,
    Moon,
    Menu,
    X
} from "lucide-react";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();


    const [theme, setTheme] = useState("dark");
    const [showMenu, setShowMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";

        setTheme(savedTheme);

        document.body.className = savedTheme;
    }, []);

    function toggleTheme() {
        const newTheme = theme === "dark" ? "light" : "dark";

        setTheme(newTheme);

        document.body.className = newTheme;

        localStorage.setItem("theme", newTheme);
    }

    const token = localStorage.getItem("token");

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    }

    return (
        <nav className="navbar">

            <div className="logo">

                <h2>LostLines</h2>

                <span>Reconnect people with what matters.</span>

            </div>
            <button
             className="menu-toggle"
             onClick={() => setMobileMenu(!mobileMenu)}
            >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
            </button>

            <div className={`nav-links ${mobileMenu ? "active" : ""}`}>

                <Link
                    to="/"
                    onClick={() => setMobileMenu(false)}
                >
                Home
                </Link>

                {token && <Link
                    to="/"
                    onClick={() => setMobileMenu(false)}
                >
                Dashboard
                </Link>}

                <Link
                    to="/"
                    onClick={() => setMobileMenu(false)}
                >
                About
                </Link>

            </div>

            <div className="nav-user">

                <button
                    className="theme-btn"
                    onClick={toggleTheme}
                    title="Toggle Theme"
                >
                    {theme === "dark"
                    ? <Sun size={20}/>
                    : <Moon size={20}/>
                }
                </button>

               {token ? (
    <div className="user-menu">

        <button
            className="primary-btn"
            onClick={() => setShowMenu(!showMenu)}
        >
            {user?.name} ▼
        </button>

        {showMenu && (
            <div className="user-dropdown">

                <Link
                to="/profile"
                onClick={()=>{
                setShowMenu(false);
                setMobileMenu(false);
                }}

                    className="dropdown-item"
                    onClick={() => setShowMenu(false)}
                >
                    My Profile
                </Link>

                <button
                    className="dropdown-item logout-btn"
                    onClick={()=>{
                        setMobileMenu(false);
                        handleLogout();
                    }}
                >
                    Logout
                </button>

            </div>
        )}

    </div>
) : (
    <Link
        to="/login"
        className="primary-btn"
    >
        Login
    </Link>
)}

            </div>

        </nav>
    );
}

export default Navbar;