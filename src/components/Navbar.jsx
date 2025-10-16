import { Link } from 'react-router-dom';

function Navbar(){
    return(
        <nav style={{ background: "#282c34", padding: "10px"}}>
            <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>Home</Link>
            <Link to="/tasks" style={{ color: "#fff", marginLeft: "15px"}}>Tarefas</Link>
            <Link to="/reports" style={{ color: "#fff", }}>Relatórios</Link>
        </nav>
    );
}


export default Navbar