const express = require('express');
const router = express.Router();
const db = require('../db');

console.log("⚡ Routes /api/projects cargadas");

// ------------------------
// Crear un proyecto
// ------------------------
router.post('/', async (req, res) => {
    const { creator_id, title, description, image, link } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO projects (creator_id, title, description, image, link)
             VALUES (?, ?, ?, ?, ?)`,
            [creator_id, title, description, image, link]
        );
        res.json({ id: result.insertId });
    } catch (err) {
        console.error("Error al crear proyecto:", err);
        res.status(500).json({ error: 'Error al crear proyecto' });
    }
});

// ------------------------
// Obtener todos los proyectos de un creador
// ------------------------
router.get('/:creator_id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM projects WHERE creator_id = ?',
            [req.params.creator_id]
        );
        res.json(rows);
    } catch (err) {
        console.error("Error al obtener proyectos:", err);
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
});

module.exports = router;
