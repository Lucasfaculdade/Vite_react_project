import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children}) {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    async function login(email, password) {
        try {
            const response = await api.post("/auth/login", {
                email, password,
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setUser(user);
            setAuthenticated(true);

            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: 
                    err.response?.data?.error ||
                    "E-mail ou senha inválidos",
            };
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete api.defaults.headers.Authorization
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}