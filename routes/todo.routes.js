const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM primarytable;');

        res.status(200).json(data.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { key, value } = req.body;

    try {
        const data = await db.query(
            'INSERT INTO primarytable (key, value) VALUES ($1, $2);',
            [key, value]
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
    const { key } = req.body;

    try {
        const data = await db.query(
            'DELETE FROM primarytable WHERE key = $1;',
            [key]
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