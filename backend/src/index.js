import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", authMiddleware, tasksRoutes);

app.get("/health", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            status: "ok",
            dbTime: result.rows[0],
        });
    } catch (err) {
        res.status(500).json({ error: "Erro no banco" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`backend rodando em http://localhost:${process.env.PORT}`);
});