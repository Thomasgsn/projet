const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
            [title]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // On récupère la tâche actuelle pour inverser son "done"
        const task = await pool.query('SELECT done FROM tasks WHERE id = $1', [id]);
        if (task.rows.length === 0) {
            return res.status(404).send('Task not found');
        }
        const newDone = !task.rows[0].done;
        const result = await pool.query(
            'UPDATE tasks SET done = $1 WHERE id = $2 RETURNING *',
            [newDone, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
