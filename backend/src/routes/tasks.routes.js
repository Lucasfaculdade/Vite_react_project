
import { Router } from "express";
import { pool } from "../db/index.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT taspk, tastitulo, completed FROM tasksdash WHERE users_pk = $1 ORDER BY taspk DESC",
    [req.user.id]
  );
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  console.log("REQ.USER", req.user);
  
  const { title } = req.body;

  console.log("TITLE", title);

  if (!title) {
    return res.status(400).json({ error: "Título obrigatório" });
  }

  // 🔑 req.user.id vem do JWT (usersDash.usepk)
  const result = await pool.query(
    `INSERT INTO tasksdash (tastitulo, users_pk)
     VALUES ($1, $2)
     RETURNING taspk, tastitulo, tasconcluida, users_pk`,
    [title, req.user?.id]
  );

  res.status(201).json(result.rows[0]);
});

router.put("/:taspk", async (req, res) => {
    const { completed } = req.body;

    await pool.query(
        `UPDATE tasksdash SET completed = $1 WHERE taspk = $2 AND users_pk = $3`,
        [completed, req.params.taspk, req.user.users_pk]
    );

    res.json({ message: "Task atualizada" });
});

router.delete("/:taspk", async (req, res) => {
    await pool.query(
        `DELETE FROM tasksdash WHERE taspk = $1 AND users_pk = $2`,
        [req.params.taspk, req.user.users_pk]
    );

    res.json({ message: "Task removida" });
});

export default router;