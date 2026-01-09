
import api from "./api";

export async function login(email, password) {
    const response = await api.post("/auth/login", { email, password });    

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data.user;

}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function isAuthenticated() {
    return !!localStorage.getItem("token");
}