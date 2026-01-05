import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";
const STORAGE_KEY = "tasks_v1";


export function getTasks() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function addTask(title) {
    const tasks = getTasks();
    const newTask = {
        id: Date.now(),
        title,
        completed: false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...tasks, newTask]));
}

export function toggleTask(id) {
    const tasks = getTasks().map(
        task => task.id === id ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function deleteTask(id) {
    const tasks = getTasks().filter(task => task.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}