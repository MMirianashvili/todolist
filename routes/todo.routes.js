const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM todo;');

        res.status(200).json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { task } = req.body;

    try {
        const data = await db.query(
            'INSERT INTO todo (task) VALUES ($1);',
            [task]
        );

        res.status(200).json({
            message: `${data.rowCount} row inserted.`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body;

    try {
        const data = await db.query(
            'DELETE FROM todo WHERE id = $1;',
            [id]
        );

        res.status(200).json({
            message: `${data.rowCount} row deleted.`
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;