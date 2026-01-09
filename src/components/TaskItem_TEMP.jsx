
export default function TaskItem({ task, onToggle, onDelete }) {
    return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
        <div className="form-check">
            <input className="form-check-input" type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id, !task.completed)}/>
                <label 
                    className={`form-check-label ms-2 ${ 
                    task.completed ? "text-decoration-line-through text-muted" : ""}`}
                    >{task.title}
                </label>
        </div>

        <button 
        className="btn btn-sm btn-outline-danger" 
        onClick={() => onDelete(task.id)}>
            Excluir
        </button>
    </li>
    );
}