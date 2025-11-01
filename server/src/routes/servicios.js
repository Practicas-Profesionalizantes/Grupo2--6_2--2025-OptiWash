import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT ID, Tipo_Servicio, Precio FROM Servicio;', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener servicios' });
    res.json(results);
  });
});

export default router;