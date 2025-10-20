

const demoUser = {
    email: "admin@teste.com",
    password: "123456",
    name: "Admin"
};

export function login({ email, password}) {
    if(email === demoUser.email && password === demoUser.password){
        const token = btoa(JSON.stringify({ email, time: Date.now() }));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(demoUser));
        return { success: true, user: demoUser};
    }
    return { success: false, message: "Credenciais inválidas"};
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function isAuthenticated() {
    return !!localStorage.getItem("token");
}

export function getCurrentUser() {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
}

