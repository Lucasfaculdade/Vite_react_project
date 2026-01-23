import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem_TEMP";
import { useNavigate } from "react-router-dom";
import { getTasks, addTask, toggleTask, deleteTask, updateTask } from "../services/tasksService";
import { toast } from "react-toastify";


export default function Tasks(){
    const [ tasks, setTasks ] = useState([]);
    const [ title, setTitle ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState("");
    const [ filter, setFilter ] = useState("all");
    const [ saving, setSaving ] = useState(false);
    const [ search, setSearch ] = useState("");
    const [ authChecked, setAuthChecked ] = useState(false);

    const navigate = useNavigate();

    async function loadTasks() {
        try{
            setTasks(data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } 
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) {
            navigate("/login");
            return;
        }

        async function load(){
            try{
                const data = await getTasks();
                setTasks(data);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    useEffect(() => {
        if(authChecked) loadTasks();
    }, [authChecked]);

    async function handleAdd() {
        if(!title.trim()) {
            toast.warning("Digite um titulo para a task");
            return;
        }

        try {
           setSaving(true);
           await addTask(title);
           toast.success("Task criada com sucesso");
           setTitle("");
           loadTasks();
        } catch {
            toast.error("Erro ao criar task");
        } finally {
            setSaving(false);
        }
    }
    
    async function handleDelete(taspk){
        const confirm = window.confirm(
            "Tem certeza que deseja excluir esta task?"
        );
        
        if(!confirm) return;

        try {
            await deleteTask(taspk);
            toast.info("Task removida");
            loadTasks();
        } catch (error) {
            toast.error("Error ao remover task");
        }
    }

    const filteredTasks = tasks.filter(task => {
        const text = task.tastitulo || "";

    const matchFilter = filter === "all" || 
        (filter === "done" && task.tasconcluida) ||
        (filter === "pending" && !task.tasconcluida);

    const matchSearch = text.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
    });

return(
    <div className="container mt-4">
        <div className="card">
            <div className="card-body">
                <h4 className="mb-3">Minhas Tasks</h4>

                <input 
                    className="form-control mb-3" 
                    placeholder="Buscar tarefa..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <div className="input-group mb-3">
                <input 
                    className="form-control"
                    placeholder="Nova task"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <button
                    className="btn btn-success"
                    onClick={handleAdd}
                    disabled={saving}
                >
                    {saving ? "Salvando..." : "Adicionar"}
                </button>
                </div>

                {!loading && filteredTasks.length > 0 && (
                    <ul className="list-group">
                        {filteredTasks.map(task => (
                            <TaskItem
                                key={task.taspk}
                                task={task}
                                onToggle={async (id, done) => {
                                    await toggleTask(id, done);
                                    loadTasks();
                                }}
                                onEdit={async (id, title) => {
                                    await updateTask(id, title);
                                    loadTasks();
                                }}
                                onDelete={handleDelete}
                            />
                        ))}
                    </ul>
                )}

                {!loading && filteredTasks.length === 0 && (
                    <div className="alert alert-info text-center">
                        Nenhuma tarefa encontrada.
                    </div>
                )}
            </div>
        </div>
    </div>
);
}