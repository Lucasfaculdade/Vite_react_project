
import bcrypt from "bcryptjs";
import { pool } from "../db/index.js";

const createAdmin = async () => {
    const passwordHash = await bcrypt.hash("123456", 10);

    await pool.query(
        "INSERT INTO usersdash (usenome, useemail, usepassword) VALUES ($1, $2, $3)",
        ["Admin_Teste", "teste@admin.com", passwordHash]
    );

    console.log("usuário admin criado");
    process.exit();
};

createAdmin();