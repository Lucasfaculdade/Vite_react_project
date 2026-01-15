
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login({ setAuthenticated }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
        navigate("/tasks");
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh"}}>
            <div className="card p-4 shadow" style={{ width: "350px"}}>
                <h4 className="text-center mb-3">Login</h4>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>E-mail</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label>Senha</label>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}