import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../services/authService"

export default function Register () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();
        try{
            await register(name, email, password);
            toast.success("Usuario criado com sucesso!");
            navigate("/login");
        } catch (error) {
            const msg = error.response?.data?.message || "Erro ao registrar usuario, tente novamente mais tarde.";
            toast.error(msg); 
        }
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <div className="card p-4 shadow">
                <h2 className="text-center">Criar Conta</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label>Nome:</label>
                        <input type="text" className="form-control" required
                                value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label>E-mail:</label>
                        <Input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label>Senha:</label>
                        <input type="password" className="form-control" required
                                value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button className="btn btn-success w-100" type="submit">Cadastrar</button>
                </form>
                <p className="mt-3 text-center">
                    Ja tem conta? <Link to="/login">Faca login</Link>
                </p>
            </div>
        </div>
    );
}