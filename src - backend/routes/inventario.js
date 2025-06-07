import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM  Producto;', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error' });
    res.json(results); 
  });
});


router.put('/actualizar/:id', (req, res) => {
  const id = req.params.id;
  const { litrosComprados } = req.body;
  const sql = 'UPDATE Producto SET Litros = Litros + ? WHERE ID = ?';

  db.query(sql, [litrosComprados, id], (err, result) => {
    res.send('Producto actualizado con nuevos litros');
  });
});

export default router;