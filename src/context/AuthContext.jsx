import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true); 

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (token && storedUser) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    async function login(email, password) {
        try {
            const response = await api.post("/auth/login", { email, password });
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(user);
            toast.success("Bem-vindo(a) de Volta!");
        } catch (error) {
            console.error("Error no login:", error);
            const mensagem = error.response?.data?.message || "Erro ao conectar com o servidor";
            toast.error(mensagem);
        }
    }
    
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        delete api.defaults.headers.Authorization;

        setUser(null);
        toast.info("Você deslogou com sucesso!");
    };

    return(
        <AuthContext.Provider 
        value={{ 
            user, 
            authenticated: !!user,
            login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}