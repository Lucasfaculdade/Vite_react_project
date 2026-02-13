
import { Link, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar(){
    const navigate = useNavigate();
    const { user, logout } = useAuth();
33
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="nav-link text-white me-4" to="/dashboard">
                Dashboard
            </Link>

            <Link className="nav-link text-white" to="/tasks">
                Tasks
            </Link>

            <div className="ms-auto d-flex align-items-center gap-3">
                { user && 
                <span className="text-white"> Olá, {user.name} </span> 
                }
                
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    Sair
                </button>
            </div>
        </nav>
    );
}