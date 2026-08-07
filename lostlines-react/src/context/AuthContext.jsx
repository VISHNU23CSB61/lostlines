import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }

    }, []);

    function login(userData, jwtToken) {

        setUser(userData);

        setToken(jwtToken);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "token",
            jwtToken
        );

    }
    function updateUser(userData) {

    setUser(userData);

    localStorage.setItem(
        "user",
        JSON.stringify(userData)
    );

}

    function logout() {
     setUser(null);
     setToken("");
     localStorage.removeItem("user");
     localStorage.removeItem("token");
     window.location.href = "/login";
   }

    return (

        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                updateUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export default AuthProvider;