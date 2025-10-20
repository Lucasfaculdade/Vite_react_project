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


export function createTask({title, description = "", completed = false}) {
    const tasks = loadLocalTasks();
    const newTasks = {
        id: Date.now(),
        title,
        description,
        completed,
        createAt: Date.now(),
    };
    tasks.unshift(newTasks);
    saveLocalTasks(tasks);
    return newTasks;
}

export function updateTask(id, patch) {
    const tasks = loadLocalTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if(idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...patch };
    saveLocalTasks(tasks);
    return tasks[idx];
}

export function deleteTasks(id) {
    let tasks = loadLocalTasks();
    tasks = tasks.filter((t) => t.id !== id);
    saveLocalTasks(tasks);
    return tasks;
}

export function toggleTaskCompleted(id) {
    const tasks = loadLocalTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if(idx === -1) return null;
    tasks[idx].completed = !tasks[idx].completed;
    saveLocalTasks(tasks);
    return tasks[idx];
}