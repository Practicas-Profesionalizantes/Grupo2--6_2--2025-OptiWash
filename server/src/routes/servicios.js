// routes/servicios.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET: listar servicios
router.get('/', (req, res) => {
  db.query('SELECT ID, Tipo_Servicio FROM Servicio;', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener servicios' });
    res.json(results);
  });
});

export default router;
