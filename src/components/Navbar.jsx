import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCurrentUser, isAuthenticated, logout } from '../services/authService';
import { useEffect, useState } from 'react';

function Navbar(){
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    const [user, setUser] = useState(getCurrentUser());
    const navigate = useNavigate();


    useEffect(() => {
        const interval = setInterval(() => {
            setLoggedIn(isAuthenticated());
            setUser(getCurrentUser());
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        logout();
        setLoggedIn(false);
        navigate("/login");
    };


    return(
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-sm">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">📊 Dashboard</Link>
         
                
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                       {loggedIn ? (
                        <>
                         <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Tarefas</Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link" to="/reports">Relatórios</Link>
                        </li>
                        <li className="nav-item">
                          <a onClick={handleLogout} className="nav-link text-light" style={{ cursor: "pointer" }}>🚪 Sair ({user?.name})</a>
                        </li>
                        </>
                       ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Entrar</Link>
                        </li>
                       )}
                    </ul>
                </div>
            </div>
       </nav>
    );
}


export default Navbar