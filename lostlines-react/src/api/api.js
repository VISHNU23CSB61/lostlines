import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Map any Axios error to a safe, user-friendly message.
function buildUserMessage(error) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    if (status === 401) return serverMessage || "Authentication failed.";
    if (status === 403) return "Access denied.";
    if (status === 404) return serverMessage || "Resource not found.";
    if (status === 500) return "Server error. Please try again later.";
    if (serverMessage) return serverMessage;

    // No response from the server (network / backend down)
    return "Backend unavailable. Please check your connection.";
}

// Clear all authentication state and go back to the login page.
// This mirrors AuthContext.logout() so users are not forced to
// manually delete localStorage when a token expires.
function handleSessionExpired() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.error("Session expired. Please login again.");
    if (window.location.pathname !== "/login") {
        window.location.href = "/login";
    }
}

// Centralized response handling for a consistent error experience.
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || "";
        const hasAuthHeader = Boolean(error.config?.headers?.Authorization);

        // A 401 on an authenticated (non-login) request means the JWT is
        // missing, invalid or expired. Ignore auth endpoints because those
        // return 401 for bad credentials and must not trigger a redirect.
        const isExpiredSession =
            status === 401 && hasAuthHeader && !url.startsWith("/auth/");

        error.userMessage = buildUserMessage(error);
        error.sessionExpired = isExpiredSession;

        if (isExpiredSession) {
            handleSessionExpired();
        }

        return Promise.reject(error);
    }
);

export default API;