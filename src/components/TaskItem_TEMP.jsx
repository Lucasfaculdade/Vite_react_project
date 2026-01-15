
import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(task.tastitulo);

    const handleSave = () => {
        if(!text.trim()) return;
        onEdit(task.taspk, text);
        setEditing(false);
    };

    return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${
        task.completed ? "list-group-item-success" : ""
    }`}>
        <div className="d-flex align-items-center gap-2 w-100">
            <input type="checkbox" className="form-check-input" 
            checked={task.tasconcluida} onChange={() => onToggle(task.taspk, !task.tasconcluida)}/>
        
        {!editing ? (
            <span 
                className="flex-grow-1" 
                style={{ cursos: "pointer" }}
                onDoubleClick={() => setEditing(true)}>
                    {task.tastitulo}
            </span>
        ) : ( 
            <input 
                className="form-control form-control-sm" 
                value={text}
                autoFocus
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") {
                        setEditing(false);
                        setText(task.titulo);
                    }
                }}
            />
        )}
        </div>

        <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(task.taspk)}
        >
            Excluir
        </button>
    </li>
    );
}