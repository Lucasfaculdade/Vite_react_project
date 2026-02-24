import { useEffect, createContext, useContext, useState} from "react";
import { isAuthenticated } from "../services/authService";
import { toast } from "react-toastify";
import api from "../services/api";

const AuthContext = createContext({});

export function AuthProvider ({ children }) {
    const [ user,setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if(token && storedUser){

            API_URL.defaults.headers.Authorization = `Bearer ${token}`;
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    async function login(email, password){
        try{
            const response = await API_URL.post("/auth/login", { email, password });
            const { token, user: userData } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));

            API_URL.defaults.headers.Authorization = `Bearer ${token}`;

            setUser(userData);
            Toast.success("Bem-vindo(a) de volta!");
        } catch (error) {
            const msg = error.response?.data?.message || "E-mail ou senha invalidos.";
            Toast.error(msg);
            throw error;
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete API_URL.defaults.headers.Authorization;
        setUser(null);
        Toast.info("Voce saiu do sistema.");
    };

    return(
        <AuthContext.Provider value={{
            user, 
            isAuthenticated: !!user,
            login,
            logout,
            loading
        }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}