import { useEffect, useState } from "react";
import { getTasks, addTask, deleteTask } from "../services/tasksService";
import { toast } from "react-toastify";



export default function Tasks(){
    const [ tasks, setTasks ] = useState([]);
    const [ newTask, setNewTask ] = useState("");
    
    async function loadTasks(){
        try{
            const data = await getTasks("/tasks");
            console.log("Dados do back", data[0]);
            setTasks(data);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao carregar tarefas", error);
        }
    }

    async function handleAddTask(e) {
        e.preventDefault();
        if(!newTask.trim()) return;

        try{
            await addTask(newTask);
            setNewTask("");
            await loadTasks();
            toast.success("Tarefa adicionada!");
        } catch (error) {
            toast.error("Erro ao adicionar");
        }
    }

    async function handleDelete(id) {
        if(window.confirm("Deseja realmente excluir?")) {
            try {
                await deleteTask(id);
                await loadTasks();
                toast.success("Tarefa removida.");
            } catch (error) {
                toast.error("Erro ao excluir tarefa, tente novamente mais tarde.");
            }
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);


    return (
        <div className="container mt-4">
            <h1>Minhas Tarefas</h1>

            <form className="mb-4" onSubmit={handleAddTask}>
                <div className="input-group">
                    <input className="form-control" 
                           value={newTask}
                           onChange={(e) => setNewTask(e.target.value)}
                           placeholder="Nova tarefa..."
                    />
                    <button className="btn btn-primary" type="submit">Adicionar</button>
                </div>
            </form>

            <ul className="list-group">
                {tasks.map((task, index) => (
                    <li key={task.id || task._id || index} className="list-group-item d-flex justify-content-between">
                        {task.title || task.descricao || task.task || "Tarefa sem título"}

                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.id || task._id)}>
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}