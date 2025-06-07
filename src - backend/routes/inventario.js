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
  const { Bidon } = req.body;

  const sql = 'UPDATE Producto SET Bidon = ? WHERE ID = ?;';
  db.query(sql, [Bidon, id], (err, result) => {
    res.send('Producto actualizado');
  });
});

export default router;