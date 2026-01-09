
import API_URL from "./api";

export async function getTasks() {
    const response = await API_URL.get("/tasks");
    return response.data;
}

export async function addTask(title) {
    const response = await API_URL.post("/tasks", { title });
    return response.data;
}

export async function toggleTask(id, completed) {
    await API_URL.put(`/tasks/${id}`, { completed });
}

export async function deleteTask(id) {
    await API_URL.delete(`/tasks/${id}`);
}