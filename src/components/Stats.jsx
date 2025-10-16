import { useEffect, useState } from "react";


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
        <div style={{ marginTop: "20px" }}>
            <h3>Estatísticas</h3>
            <p>Tarefas concluidas: {stats.done}</p>
            <p>Tarefas pendentes: {stats.pending}</p>
        </div>
    );
}