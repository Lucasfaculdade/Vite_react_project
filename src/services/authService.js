
import api from "./api";

export async function login(email, password) {
    try {
        const response = await api.post("/auth/login", { email, password });
    }    catch (error) {
        if(error.response) {
            const status = error.response.status;
            const message = error.response.data.message;

            if(error.response) {
                const status = error.response.status;
                const message = error.response.data.message;

                if (status === 404) {
                    toast.error("Este e-mail nao esta cadastrado.");
                } else if (status === 401) {
                    toast.error("Senha incorreta. Tenta novamente.");
                } else {
                    Toast.error(message || "Erro ao realizar login.");
                }
            } else {
                toast.error(message || "Erro ao realizar login.");
            }
        } else {
            toast.error("Servidor offline. Tente mais tarde.");
        }
    }


}

export async function register(name, email, password) {
    return api.post("/auth/register/", { name, email, password });
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