import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const res = await API.post("/auth/login", {

                email,

                password

            });

            login(
                res.data.user,
                res.data.token
            );

            alert(res.data.message);

            navigate("/dashboard");

        }

        catch(err){

            alert(
                err.response?.data?.message ||
                "Login Failed"
            );

        }

    }

    return(

        <div
            style={{
                width:"400px",
                margin:"50px auto"
            }}
        >

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input

                    type="email"

                    placeholder="Enter Email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <br /><br />

                <input

                    type="password"

                    placeholder="Enter Password"

                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit">
                    Login
                </button>
            </form>
            <br />
            <p>
                Don't have an account?
                <Link to="/register">
                    Register
                </Link>
            </p>
        </div>
    );
}
export default Login;