
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha obrigatórios" });
    }

    const result = await pool.query(
        "SELECT usepk, usenome, useemail, usepassword FROM usersDash WHERE useemail = $1",
        [email]
    );

    const user = result.rows[0];

    if(!user){
        return res.status(401).json({
            error: "Usuário não encontrado " 
        })
    }

    const passwordMatch = await bcrypt.compare(password, user.usepassword);

    if(!passwordMatch) {
        return res.status(401).json({ error: "Senha inválida" });
    }

    const token = jwt.sign(
        { 
            id: user.usepk, 
            email: user.useemail 
        },
        process.env.JWT_SECRET,
        { 
            expiresIn: "1h"
        }
    );

    return res.json({
        token,
        user: {
            id: user.usepk,
            name: user.usenome,
            email: user.useemail
        }
    });
});

export default router;