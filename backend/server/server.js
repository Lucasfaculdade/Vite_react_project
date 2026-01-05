
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const authRouter = require('../routes/auth');
const tasksRouter = require('../routes/tasks');
const userRouter = require('../routes/users');

app.use('/auth', authRouter);
app.use('/tasks', tasksRouter);
app.use('/users', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server rodando na porta ${port}`));