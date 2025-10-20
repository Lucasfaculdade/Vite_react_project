import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function getTasks(limit = 8){
    try{
        const response = await axios.get(`${API_URL}?_limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        return [];
    }
    
}
