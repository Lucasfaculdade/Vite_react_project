
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

       try{
        await login(email, password);
        navigate("/tasks");
       } catch {
        setError("Email ou senha inválidos.");
       }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>

                <p className="mt-3 text-center">
                    Não tem conta? <a href="/register"Crie uma conta aqui></a>
                </p>
            </div>
        </div>
    );
}