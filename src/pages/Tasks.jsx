import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem_TEMP";
import { useNavigate } from "react-router-dom";
import { getTasks, addTask, toggleTask, deleteTask, updateTask } from "../services/tasksService";


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

    const loadTasks = async () => {
        try{
            setLoading(true);
            const data = await getTasks();
            setTasks(data);
            setError("");
        } catch (err) {
            console.error("Error ao carregar tarefas", err);
            setError("Error ao carregar tarefas");
        } finally {
            setLoading(false);
        }
    };

    const filteredTasks = tasks.filter(task => {
        const title = task.tastitulo || "";

        const matchFilter = 
            filter === "all" ||
            (filter === "done" && task.tasconcluida) ||
            (filter === "pending" && !task.tasconcluida);

        const matchSearch = title
        .toLowerCase()
        .includes(search.toLowerCase());

        return matchFilter && matchSearch;
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token) {
            navigate("/login");
            return;
        }
        setAuthChecked(true);
    }, []);

    useEffect(() => {
        if(!authChecked) return;
        loadTasks();
    }, [authChecked]);

    const handleAdd = async () => {
        const value = title.trim();
        if(!value) return;

        try {
            setSaving(true);
            await addTask(value);
            setTitle("");
            loadTasks();
        } catch (err) {
            console.error("Error ao criar task: ", err);
        } finally {
            setSaving(false);
        }
    };


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
                <button className="btn btn-success" onClick={handleAdd} disabled={saving}>
                    {saving ? "Salvando..." : "Adicionar"}
                </button>
            </div>

            <div className="border rounded p-3 mb-3">
                <div className="btn-group w-100">
                    <button className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`} 
                    onClick={() => setFilter("all")}>
                        Todas
                    </button>

                    <button className={`btn btn-outline-warning ${filter === "pending" ? "active": ""}`}
                    onClick={() => setFilter("pending")}>
                        Pendentes
                    </button>

                    <button className={`btn btn-outline-success ${filter === "done" ? "active" : ""}`}
                    onClick={() => setFilter("done")}>
                        Concluídas
                    </button>
                </div>
            </div>

            <p className="text-muted">
                Total: {tasks.length} | Pendentes: { tasks.filter(t => !t.tasconcluida).length}
            </p>

            { loading && (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary"/>
                </div>
            )}

           { !loading && filteredTasks.length > 0 && (
              <ul className="list-group">
                {filteredTasks.map(task => (
                    <TaskItem 
                    key={task.taspk}
                    task={task}
                    onToggle={async (taspk, tasconcluida) =>{
                        await toggleTask(taspk, tasconcluida);
                        loadTasks();
                    }}
                    onEdit={async (taspk, title) => {
                        await updateTask(taspk, title);
                        loadTasks();
                    }}
                    onDelete={async taspk => {
                        await deleteTask(taspk);
                        loadTasks();
                    }}
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