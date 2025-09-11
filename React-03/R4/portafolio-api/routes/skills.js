const express = require('express');
const router = express.Router();
const db = require('../db');

// ------------------------
// Crear una skill
// ------------------------
router.post('/', async (req, res) => {
    const { creator_id, name, level } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO skills (creator_id, name, level)
             VALUES (?, ?, ?)`,
            [creator_id, name, level]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        console.error("Error al crear skill:", err);
        res.status(500).json({ error: 'Error al crear skill' });
    }
});

// ------------------------
// Obtener todas las skills de un creador
// ------------------------
router.get('/:creator_id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM skills WHERE creator_id = ?',
            [req.params.creator_id]
        );
        res.json(rows);
    } catch (err) {
        console.error("Error al obtener skills:", err);
        res.status(500).json({ error: 'Error al obtener skills' });
    }
});

module.exports = router;
