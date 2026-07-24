import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("Interceptor Token:", token); // <-- Add this line

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Headers Sent:", config.headers); // <-- Add this too

    return config;
});

export default API;