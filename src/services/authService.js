
const USER_KEY = "user_logged";

export function login(email, password) {
    
    if (email === "admin@teste.com" && password === "123456") {
        const user = {
            name: "Admin",
            email,
        };
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        return true;
    }
    return false;
}

export function logout() {
    localStorage.removeItem(USER_KEY);
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

export function isAuthenticated() {
    return !!localStorage.getItem(USER_KEY);
}