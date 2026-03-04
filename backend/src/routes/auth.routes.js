
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try{
        const result = await pool.query(
            "SELECT usepk, usename, useemail, usepassword FROM userdash WHERE useemail = $1",
            [email]
        
        );

        const user = result.rows[0];

        if(!user) {
            return res.status(401).json({ error: "Usuario nao encontrado" });
        }

        const passwordMatch = await bcrypt.compare(password, user.usepassword);
        if(!passwordMatch) {
            return res.status(401).json({ error: "Senha invalida" });
        }

        const token = jwt.sign(
            { id: user.userpk, email: user.useemail },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            token,
            user: {
                id: user.usepk,
                name: user.usename,
                email: user.useemail
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

router.post("/register", async (req, res) => {
    const {name, email, password } = req.body;

    try {
        const userExists = await pool.query("SELECT * FROM userDash WHERE useemail = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Este e-amil ja esta cadastrado" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO userDash (usename, useemail, usepassword) VALUES ($1, $2, $3)",
            [name, email, passwordHash]
        );

        return res.status(201).json({ message: "Usuario criado com sucesso!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao criar usuario" });
    }
});

export default router;