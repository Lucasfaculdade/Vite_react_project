

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = requrie('../db');

router.post('/', async (req, res) => {
    try {
        const { usenome, useemail, usepassword } = req.body;

        const password_hash = await bcrypt.hash(usepassword, 10);

        const result = await db.query(
            `INSERT INTO usersdash (usenome, useemail, usepassword)
            VALUES($1, $2, $3)
            RETURNING id, usenome, useemail, criado_em
            `, [usenome, useemail, password_hash]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error ao criar usuário, por favor reinicie a página e tente novamente.'});
    }
});

module.exports = router;