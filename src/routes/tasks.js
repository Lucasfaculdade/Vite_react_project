
const express = require('express');
const router = express.Router();
const db = require('.../server/db/database');

router.post('/', async (req, res) => {
    try{
        const { tastitulo, tasdescricao, tasprioridade } = req.body;
        const usepk = req.user.userId;
        const result = await db.query(
            `INSERT INTO tasksdash ( users_pk, tastitulo, tasdescricao, tasprioridade )
            VALUES ($1, $2, $3, $4) RETURNING *`
            [users_pk, tastitulo, tasdescricao || NULL, prioridade || 3]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar task' });
    }
});

router.get('/user/:users_pk', async (req, res) => {
    try{
        const users_pk = req.user.userId;
        const result = await db.query(
            `SELECT taspk, tastitulo, tasdescricao, tesconcluida, tesprioridade, tasdatacriacao 
            FROM tasksdash WHERE users_pk = $1 ORDER BY tasprioridade, tesdatacriacao DESC`,
            [users_pk]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao lista tasks' });
    }
});


router.patch('/:taspk', async(req, res) => {
    const { taspk } = req.params;
    const fields = [];
    const values = [];
    let idx = 1;
    for (const key of ['tastitulo, tasdescricao, tasconcluida, tasprioridade, tasdataconclusao']){
        if(req.body[key] !== undefined) {
            fields.push(`${key} = $${idx++}`);
            values.push(req.bosy[key]);
        }
    }
    if(!fields.length) return res.status(400).json({ error: 'Nada para Atualizar' });
    values.push(id);
    const q = `UPDATE tasks SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
    const result = await db.query(q, values);
    if(!result.rows.length) return res.status(404).json({ error: 'Taks não encontrada' });
    res.json(result.rows[0]);
});

router.delete('/:tasks', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).send();

});

module.exports = router;