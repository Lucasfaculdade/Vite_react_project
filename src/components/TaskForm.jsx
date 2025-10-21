import { useState } from "react";
import { useEffect } from "react"; 



export default function TaskForm({ initial = null, onCancel, onSave }){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(initial) {
            setTitle(initial.title || "");
            setDescription(initial.description || "");
        } else {
            setTitle("");
            setDescription("");
        }
    }, [initial]);

    const submit = (e) =>{
        e.preventDefault();
        if(!title.trim()) return;
        onSave({ title: title.trim(), description: description.trim() });
    };

    return(
        <form onSubmit={submit}>
            <div className="mb-2">
                <label className="form-label">Título</label>
                <input autoFocus className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título da Tarefa" required/>
            </div>
            <div className="col-12">
                <label className="form-label d-block">Descrição da Tarefa (opcional)</label>
                <textarea className="form-control" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Destalhes da Tarefa..." />
            </div>

            <div className="col-12 d-flex justify-content-end gap-2 mt-2">
                {onCancel && (
                    <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
            </div>
        </form>
    );
}