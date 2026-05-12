const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM primarytable;');

        res.status(200).json({
            primarytable: data.rows
        });

    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {

    const { task } = req.body;

    try {

        const data = await db.query(
            'INSERT INTO primarytable (key, value) VALUES ($1, $2);',
            ['1', task]
        );

        res.status(200).json({
            message: `${data.rowCount} row inserted.`
        });

    } catch (error) {
        console.log(error);
    }
});

router.delete('/', async (req, res) => {

    const { key } = req.body;

    const data = await db.query(
        'SELECT * FROM primarytable WHERE key = $1;',
        [key]
    );

    if (data.rows.length === 0) {

        res.json({
            message: 'there no such task'
        });

    } else {

        try {

            const result = await db.query(
                'DELETE FROM primarytable WHERE key = $1;',
                [key]
            );

            res.status(200).json({
                message: `${result.rowCount} row was deleted.`
            });

        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = router;