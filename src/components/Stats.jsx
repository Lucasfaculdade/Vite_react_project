import { useEffect, useState } from "react";
import { getTasks } from "../services/api";


function Stats(){
    const [stats, setStats] = useState({ done: 0, pending: 0});

    useEffect(() =>{
        getTasks().then(data => {
            const done = data.filter(t => t.completed).length;
            const pending = data.length - done;
            setStats({ done, pending });
        });
    }, []);

    return(
        <div className="row text-center">
            <div className="col-md-6 mb-3">
                <div className="card border-sucess">
                    <div className="card-body">
                        <h5 className="card-title text-sucess">Tarefas Concluídas</h5>
                        <p className="card-text display-6">{stats.done}</p>
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-3">
                <div className="card border-warning">
                    <div className="card-body">
                        <h5 className="card-tittle text-warning">Tarefas Pendentes</h5>
                        <p className="card-text display-6">{stats.pending}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stats