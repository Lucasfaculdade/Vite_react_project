import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem_TEMP";
import { getTasks, toggleTask, deleteTask } from "../services/tasksService";

export default function Tasks(){
    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        setTasks(getTasks());
    }, []);


return(
    <div className="container mt-4">
        <div className="card shadow-sm">
            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="mb-0">Tarefas</h4>
                    <button className="btn btn-success">
                        Nova Tarefa
                    </button>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Buscar</span>
                    <input type="text" className="form-control" placeholder="Pesquisar tarefas..."/>
                </div>

                <div className="mb-3 text-muted">
                    Total: <strong>{tasks.length}</strong> Tarefas
                </div>

                <ul className="list-group">
                    {tasks.length === 0 && (
                        <li className="list-group-item text-center text-muted py-4">
                            Nenhuma tareda encontrada
                        </li>
                    )}

                    {tasks.map(task => (
                        <TaskItem key={task.id} task={task} onToggle={id =>{
                            toggleTask(id);
                            setTasks(getTasks());
                        }}
                        onDelete={id => {
                            deleteTask(id);
                            setTasks(getTasks());
                        }}
                        />
                    ))}
                </ul>
            </div>
        </div>
    </div>
);
}