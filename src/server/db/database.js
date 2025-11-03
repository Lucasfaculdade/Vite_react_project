import sql from "mssql";
import dotenv from "dotenv";
dotenv.confing();

export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

export async function getPool() {
    try {
        const pool = await sql.connect(sqlConfig);
        return pool;
    } catch (err) {
        console.error("❌ Erro ao conectar ao SQL Server:", err);
        throw err;
    }
}