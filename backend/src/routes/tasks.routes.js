
import { Router } from "express";
import { pool } from "../db/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try{
    const users_pk = req.user.id;

    const result = await pool.query(
    `SELECT taspk, tastitulo, tasconcluida 
    FROM tasksdash 
    WHERE users_pk = $1 
    ORDER BY taspk DESC`,
    [users_pk]
  );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error ao listar tasks" });
  }
});

router.post("/", async (req, res) => {
  console.log("REQ.USER", req.user);
  console.log("BODY RECEBIDO", req.body);
  
  try {
    const { title } = req.body;
    const users_pk = req.user.id;

  if (!title) {
    return res.status(400).json({ error: "Título obrigatório" });
  }

  const result = await pool.query(
    `INSERT INTO tasksdash (users_pk, tastitulo)
     VALUES ($1, $2)
     RETURNING taspk, tastitulo, tasconcluida`,
    [users_pk, title]
  );

  res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error ao criar task" });
  }
 });

router.put("/:taspk", async (req, res) => {
   try {
    const { taspk } = req.params;
    const { title, tasconcluida } = req.body;
    const users_pk = req.user.id;

    await pool.query(
        `UPDATE tasksdash 
        SET 
        tastitulo = COALESCE($1, tastitulo),
        tasconcluida = COALESCE($2, tasconcluida)
        WHERE taspk = $3 AND users_pk = $4`,
        [title, tasconcluida, taspk, users_pk]
    );

    res.json({ message: "Task atualizada" });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error ao atualizar task" });
   }
});

router.delete("/:taspk", async (req, res) => {
   try{
      const { taspk } = req.params;
      const users_pk = req.user.id;
      
      await pool.query(
          `DELETE FROM tasksdash 
          WHERE taspk = $1 AND users_pk = $2`,
          [taspk, users_pk]
      );

      res.status(204).send();
   } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error ao deletar task" })
   }
});

export default router;