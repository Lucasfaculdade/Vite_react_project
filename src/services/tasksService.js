import axis from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";
const STORAGE_KEY = "tasks_v1";


function normalize(apiItem) {
    return{
        id: apiItem.id,
        title: apiItem.title || "Sem título",
        completed: !!apiItem.completed,
        createdAt: apiItem.createAt || Date.now(),
        description: apiItem.description || "",
    };
}

export async function fetchTasksFromApi(){
    try {
        const res = await axios.get(`${API_URL}?_limit=${limit}`);
        return res.data.map(normalize);
    } catch (err) {
        console.error("Erro ao buscar ada API:", err);
        return [];
    }
}

export function loadLocalTasks() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

export function saveLocalTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export async function getTasks({ fallbackApi = true, limit = 8} = {}) {
    const local = loadLocalTasks();
    if(local && local.length > 0) return local;
    if(fallbackApi) {
        const fromApi = await fetchTasksFromApi(limit);
        saveLocalTasks(fromApi);
        return fromApi;
    }
    return [];
}

export async function reloadFromApi(limit = 8){
    const fromApi = await fetchTasksFromApi(limit);
    saveLocalTasks(fromApi);
    return fromApi;
}


