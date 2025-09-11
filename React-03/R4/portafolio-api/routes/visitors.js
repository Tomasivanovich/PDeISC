const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO visitors (name, email) VALUES (?, ?)`,
            [name, email]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear visitor' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM visitors');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener visitors' });
    }
});

module.exports = router;
