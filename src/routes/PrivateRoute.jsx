import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/authService";
import { useAuth } from "../context/AuthContext";


export default function PrivateRoute({ children }) {
    const { authenticated, loading } = useAuth();

    if(loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" />
            </div>
        );       
    }

    if(!authenticated) {
        return <Navigate to="/login"/>;
    }

    return children;
}