import { useState, useEffect } from "react";
import { getTasks } from "../services/tasksService";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);   

    useEffect(() => {
         async function load() {
            const data = await getTasks();
            setTasks(data);
            setLoading(false);
         }
         load();
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"/>
            </div>
        );
    }

    const total = Array.isArray(tasks) ? tasks.length : 0;
    const done = Array.isArray(tasks) ? tasks.filter(t => t.tasconcluida).length : 0;
    const pending = total - done;

    const chartData = {
        labels: [ "Concluídas", "Pendentes" ],
        datasets: [{
            data: [done, pending],
            backgroundColor: ["#198754", "#ffc107"],
            borderWidth: 1,
        },
    ],
    };

    return(
        <div className="container mt-4">
            <h4 className="mb-4">Dashboard</h4>

            <div className="row">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h6>Total</h6>
                            <h2>{total}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center text-warning">
                        <div className="card-body">
                            <h6>Pendentes</h6>
                            <h2>{pending}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center text-success">
                        <div className="card-body">
                            <h6>Concluídas</h6>
                            <h2>{done}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="text-center mb-3">
                                Status das Tasks
                            </h6>
                            <Pie data={chartData}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}