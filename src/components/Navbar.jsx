
import { Link, useNavigate} from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

export default function Navbar({ setAuthenticated }){
    const navigate = useNavigate();
    const user = getCurrentUser();

    const handleLogout = () => {
        logout();
        setAuthenticated(false);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <span className="navbar-brand">Dashboard</span>

            <div className="d-flex align-items-center gap-3 ms-auto">
                { user && 
                <span className="text-white"> Olá, {user.name} </span> 
                }
                
                <button className="btn btn-outline-light" onClick={handleLogout}>Sair</button>
            </div>
        </nav>
    );
}