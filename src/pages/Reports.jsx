import Stats from "../components/Stats";
import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import ChartPanel from "../components/ChartPanel";

function Reports(){
    const [stats, setStats] = useState({done: 0, pending: 0});

    useEffect (() => {
        getTasks(20).then(data =>{
            const done = data.filter(t => t.completed).length;
            const pending = data.length - done;
            setStats({ done, pending });
        });
    }, []);

    return (
        <div className="container text-center">
            <h2 className="mb-4">📈 Relatórios de Progresso</h2>
            
            <div className="row justify-content-center">
                <div className="col-mb-4 mb-3">
                    <div className="card border-sucess shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-sucess">Tarefas Conlcuídas</h5>
                            <p className="display-6">{stats.done}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card border-warning shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title text-warning">Pendentes</h5>
                            <p className="display-6">{stats.pending}</p>
                        </div>
                    </div>
                </div>
            </div>

            <ChartPanel done={stats.done} pending={stats.pending} />
        </div>
    );
}

export default Reports