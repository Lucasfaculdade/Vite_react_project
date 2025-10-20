import { useEffect, useState } from "react";
import { getTasks } from "../services/api";


function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=> {
        getTasks().then(data => setTasks(data)).catch(() => setError(true)).finally(() => setLoading(false));
    }, []);

    if(loading){
        return <p className="text-center mt-5">🔄 Carregando tarefas...</p>;
    }
    if(error){
        return <p className="text-center text-danger mt-5">❌ Erro ao carregar tarefas.</p>;
    }

    
    return(
        <div className="container">
            <h2 className="mb-4 text-center">Gerenciar Tarefas</h2>
            <ul className="list-group">
                {tasks.map(task =>(
                    <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-center ${
                        task.completed ? "list-group-item-sucess" : ""
                    }`}>
                        {task.title} 
                        <span className="badge bg-primary rounded-pill">
                            {task.completed ? "✅ Concluída" : "⏳ Pendente"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Tasks
