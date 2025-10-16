import axios from "axios";


export async function getTasks(){
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=8");
    return response.data;
}
