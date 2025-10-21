import { useEffect, useState } from "react";
import { getTasks,createTask, updateTask, deleteTasks, toggleTaskCompleted, reloadFromApi } from "../services/tasksService";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/taskItem";


function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [showNew, setShowNew] = useState(false);
    const [filter, setFilter] = useState("");
    const [limit, setLimit] = useState(8);

    useEffect(()=> {
        setLoading(true);
        getTasks({ fallbackApi: true, limit}).then((t) => setTasks(t)).finally(() => setLoading(false));
    }, [limit]);

   const handleCreate = (payload) =>{
    const newTask = createTask(payload);
    setTasks((s) => [newTask, ...s]);
    setShowNew(false);
   };

   const handleEditSave = (payload) => {
    const updated = updateTask(editing.id, payload);
    setTasks((s) => s.map((t) => (t.id === updateTask.id ? updated: t)));
    setEditing(null);
   };

   const handleDelete = (id) => {
    if(!confirm("Remover essa tarefa?")) return;
    deleteTasks(id);
    setTasks((s) => s.filter((t) => t.id !== id));
   };

   const handleToggle = (id) => {
    const updated = toggleTaskCompleted(id);
    setTasks((s) => s.map((t) => (t.id === updated.id ? updated : t)));
   };


   const handleReload = async () => {
    if(!confirm("Irá substituir dados locais pelas tarefas da API pública. Continuar ?")) return;
    setLoading(true);
    const fromApi = await reloadFromApi(limit);
    setTasks(fromApi);
    setLoading(false);
   };

   const filtered = tasks.filter((t) => t.title.toLowerCase().includes(filter.toLowerCase()) || (t.description || "").toLowerCase().includes(filter.toLowerCase())
   );

    
    return(
        <div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3">
                <div className="d-flex gap-2 align-items-center w-100">
                    <button className="btn btn-success" onClick={() => setShowNew((s) => !s)}>
                        + Nova Tarefa
                    </button>

                    <div className="input-group ms-2" style={{ maxWidth: 400}}>
                        <span className="input-group-text">🔎</span>
                        <input className="form-control" placeholder="Pesquisar Tarefas..." value={filter} onChange={(e) => setFilter(e.target.value)} />
                    </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                    <select className="form-select form-select-sm" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                        <option value={20}>20</option>
                    </select>
                    <button className="btn btn-outline-primary btn-sm" onClick={handleReload}>
                        Recarregar da API
                    </button>
                </div>
            </div>

            {showNew && (
                <div className="card mb-3">
                    <div className="card-body">
                        <TaskForm onCancel={() => setShowNew(false)} onSave={(payload) => handleCreate(payload)}/>
                    </div>
                </div>
            )}

            {editing && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: "rgba(0,0,0,0.4)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar tarefa</h5>
                                <button type="button" className="btn-close" onClick={() => setEditing(null)} />
                            </div>
                            <div className="modal-body">
                                <TaskForm initial={editing} onCancel={() => setEditing(null)} onSave={(payload) => handleEditSave(payload)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card">
                <div className="card-body">
                    <h5 className="card title">Tarefas ({filtered.length})</h5>

                    {loading ? (
                        <div className="text-center py-4">🔄 Carregando...</div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-4 text-muted">Nenhuma tarefa encontrada.</div>
                    ) : (
                        <ul className="list-group">
                            {filtered.map((task) => (
                                <TaskItem key={task.id} task={task} onEdit={(t) => setEditing(t)} onDelete={(id) => handleDelete(id)} onToggle={(id) => handleToggle(id)}/>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tasks
