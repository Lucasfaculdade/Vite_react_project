import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem_TEMP";
import { getTasks, toggleTask, deleteTask, addTask } from "../services/tasksService";

export default function Tasks(){
    const [ tasks, setTasks ] = useState([]);
    const [ title, setTitle ] = useState("");

    const loadTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleAdd = async () => {
        if(!title) return;
        await addTask(title);
        setTitle("");
        loadTasks();
    };


return(
   <div className="container mt-4">
    <div className="card">
        <div className="card-body">
            <h4 className="mb-3">Minhas Tasks</h4>

            <div className="input-group mb-3">
                <input 
                className="form-control"
                placeholder="Nova task"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAdd}>
                    Adicionar
                </button>
            </div>

            <ul className="list-group">
                {tasks.map(task => (
                    <TaskItem
                        key={task.taspk}
                        task={{
                            id: task.taspk,
                            title: task.tastitulo,
                            completed: task.completed
                        }}
                        onToggle={async (id, completed) => {
                            await toggleTask(id, completed);
                            loadTasks();
                        }}
                        onDelete={async id => {
                            await deleteTask(id);
                            loadTasks();
                        }}
                    />
                ))}
            </ul>
        </div>
    </div>
   </div>
);
}