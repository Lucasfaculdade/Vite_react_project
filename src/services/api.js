import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333",
});

api.interceptors.request.use(config => {
    if (config.url === "/auth/login") {
        return config;
    }

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;