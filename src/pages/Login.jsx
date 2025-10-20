import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated} from "../services/authService";


export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: ""});
    const [error, setError] = useState("");

    useEffect(() => {
        if(isAuthenticated()) {
            navigate("/tasks", { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(form);
        if(result.success) {
            navigate("/tasks", { replace: true });
        } else {
            setError(result.message);
        }
    };

    return(
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%"}}>
                <h3 className="mb-3 text-center">🔐 Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" value={form.email} 
                        onChange={handleChange} className="form-control" 
                        placeholder="email@email.com" required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input type="password" name="password" value={form.password} 
                        onChange={handleChange} className="form-control" placeholder="********"
                        required/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
            </div>
        </div>
    );
}

