import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

// Debug interceptor
API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        console.log("========= API INTERCEPTOR =========");
        console.log("Token:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log("Headers being sent:", config.headers);

        return config;
    },
    (error) => Promise.reject(error)
);

export default API;