import { useEffect, useState } from "react";
import { getTasks } from "../services/api";


function Tasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(()=> {
        getTasks().then(data => setTasks(data));
    }, []);

    
    return(
        <div style={{ padding: "20px" }}>
            <h2>Gerenciar Tarefas</h2>
            <ul>
                {tasks.map(task =>(
                    <li key={task.id}>
                        {task.title} - {task.completed ? "✅ Concluída" : "⏳ Pendente"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

