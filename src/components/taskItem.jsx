


export default function TaskItem ({ task, onEdit, onDelete, onToggle }){
    return(
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="d-flex gap-3 align-items-center" style={{ minWidth: 0 }}>
                <div>
                    <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} className="form-check-input me-2" id={"chk-" + task.id}/>
                </div>
                <div style={{ minWidth: 0 }}>
                    <div className={`fm-semibold ${task.completed ? "text-decoration-line-through text-muted" : ""}`} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> 
                        {task.title}
                    </div>
                    {task.description && <div className="small text-muted">{task.description}</div>}
                </div>
            </div>

            <div className="btn-group btn-group-sm" role="group" aria-label="acoes">
                <button className="btn btn-outline-secondary" onClick={() => onEdit(task)}>
                    ✏️
                </button>
                <button className=" btn btn-outline-danger" onClick={() =>onDelete(task.id)}>
                    🗑
                </button>
            </div>
        </li>
    );
}