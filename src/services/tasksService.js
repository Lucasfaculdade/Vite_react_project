
import api from "./api";

export async function getTasks() {
    const response = await api.get("/tasks");
    return response.data;
}

export async function addTask(title) {
    return api.post("/tasks", {title});
}

export async function toggleTask(taspk, completed) {
    await api.put(`/tasks/${taspk}`, { tasconcluida: completed });
}

export async function updateTask(taspk, title) {
    return api.put(`/tasks/${taspk}`, {title});
}

export async function deleteTask(id) {
    await api.delete(`/tasks/${id}`);
}