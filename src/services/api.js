import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333",
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
            return Promise.reject({
                handle: true,
                response: error.response,
            });
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;