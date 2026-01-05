
import { Link, useNavigate} from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";

export default function Navbar(){
    const navigate = useNavigate();
    const user = getCurrentUser();

    if(!user) return null;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand" to="/tasks">
                Dashboard
            </Link>

            <div className="collapse navbar-collapse show">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks">Tasks</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/reports">Reporsts</Link>
                    </li>
                </ul>
                
                <span className="navbar-text me-3">
                    Olá, {user.name}
                </span>

                <button className="btn btn-outline-light" onClick={handleLogout}>Sair</button>
            </div>
        </nav>
    );
}