

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrpyt');
const jwt = require('jsonwebtoken');
const db = require('.../server/db/database');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1H';


router.post('/register', async (req, res) => {
    try {
        const { usenome, useemail, usepassword } = req.body;
        if(!usenome || !useemail || !usepassword) return res.status(400).json({ message: 'Faltam dados a serem preenchidos' });

        const exists = await db.query('SELECT usePk FROM usersdash WHERE useemail = $1', [useemail]);
        if(exists.rows.length) return res.status(409).json({ message: 'Email já cadastrado' });

        const password_hash = await bcrypt.hash(password, 10);
        const result = await db.query(
            `INSERT INTO usersdash ( usenome, useemail, password_hash ) 
            VALUES ($1, $2, $3) RETURNING usePk, usenome, useemail`,
            [usenome, useemail, password_hash ]
        );
        const usersdash = result.rows[0];
        const token = jwt.sign({ userId: usePk, email: useemail }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(201).json({ usersdash, token });
    } catch (err) {
        console.error('Ocorreu um erro no resgistro por favor tentar novamente mais tarde', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});

router.post('/login', async(req, res) => {
    try{
        const { useemail, usepassword } = req.body;
        if(!useemail || !usepassword) return res.status(400).json({ message: 'A dados ausentes na tentativa de login por favor tentar novamente'});

        const result = await db.query('SELECT usePk, usenome, useemail, password_hash FROM usersdash where email = $1', [email]);
        if(!result.rows.length) return res.status(401).json({ message: 'Credenciais inseridas estão invalidas, por favor corrija e tenta novamente' });

        const user = result.rows[0];
        const ok = await bcrypt.compare(password, user.password_hash);
        if(!ok) return res.status(401).json({ message: 'Credenciais inseridas estão invalidas, por favor corrija e tenta novamente' });

        const token = jwt.sign({ userId: usePk, email: useemail }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({ token, user: { id: usepk, name: usenome, email: useemail} });
    } catch (err) {
        console.error('Erro ao efetuar o login:', err);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
});

module.exports = router;

