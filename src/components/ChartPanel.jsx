import { Bar, Pie} from "react-chartjs-2";
import { 
    Chart as ChartJS, ArcElement, 
    BarElement, CategoryScale, LinearScale, 
    Tooltip, Legend  
} 
from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);


function ChartPanel({done, pending}) {
    const  barData = {
       labels: ["Concluídas", "Pendentes"],
       datasets:[{
            label: "Tarefas",
            data: [done, pending],
            backgroundColor: ["#198754", "#ffc107"],
            borderWidth: 1,
       },
    ],
    };

    const pieData = {
        labels:["Concluídas", "Pendentes"],
        datasets:[{
            data: [done, pending],
            backgroundColor:["#198754", "#ffc107"],
        },
    ],
    };

    return(
        <div className="row mt-4">
            <div className="col-md-6 mb-3">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title text-center">Gráfico</h5>
                        <Bar data={barData}/>
                    </div>
                </div>
            </div>

            <div className="col-md-6 mb-3">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="card-title text-center">Gráfico de Pizza</h5>
                        <Pie data={pieData}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartPanel;