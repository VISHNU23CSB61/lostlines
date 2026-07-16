import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        try {

            const res = await API.post("/auth/register", {
                name,
                email,
                password

            });
            alert(res.data.message);
            navigate("/login");
        }
        catch (err) {
            alert(
                err.response?.data?.message ||
                "Registration Failed"
            );
        }
    }

    return (
        <div
            style={{
                width: "400px",
                margin: "50px auto"
            }}
        >
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />
                <br /><br />
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <br /><br />
                <button type="submit">
                    Register
                </button>
            </form>
            <br />
            <p>
                Already have an account?
                <Link to="/login">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default Register;