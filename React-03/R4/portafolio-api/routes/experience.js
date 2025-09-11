const express = require('express');
const router = express.Router();
const db = require('../db');

// ------------------------
// Actualizar experiencia
// ------------------------
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { company, role, year_start, year_end, description } = req.body;

    try {
        // Actualiza solo los campos recibidos
        const [result] = await db.query(
            `UPDATE experience
             SET company = ?, role = ?, year_start = ?, year_end = ?, description = ?
             WHERE id = ?`,
            [company, role, year_start, year_end, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Experiencia no encontrada' });
        }

        res.json({ message: 'Experiencia actualizada correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar experiencia' });
    }
});

// ------------------------
// Obtener experiencias por creador
// ------------------------
router.get('/:creator_id', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM experience WHERE creator_id = ?',
            [req.params.creator_id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener experiencias' });
    }
});

module.exports = router;
