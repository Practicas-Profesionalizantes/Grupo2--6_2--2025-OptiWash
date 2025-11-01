import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM Producto ORDER BY Nombre', (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ mensaje: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

router.put('/actualizar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const cantidad = parseFloat(req.body.cantidad);
  const precio = parseFloat(req.body.precio);

  if (isNaN(cantidad)) {
    return res.status(400).json({ mensaje: 'La cantidad no es válida' });
  }

  const sqlSelect = 'SELECT Bidon, precio_unitario FROM Producto WHERE ID = ?';
  db.query(sqlSelect, [id], (err, results) => {
    if (err) {
      console.error('Error al consultar producto:', err);
      return res.status(500).json({ mensaje: 'Error al consultar producto' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const stockActual = results[0].Bidon;
    const precioActual = results[0].precio_unitario;

    const nuevoStock = stockActual + cantidad;

    if (nuevoStock < 0) {
      return res.status(400).json({ 
        mensaje: 'No puedes usar más productos de los que hay en stock' 
      });
    }

    const precioFinal = !isNaN(precio) && precio > 0 ? precio : precioActual;

    const sqlUpdate = 'UPDATE Producto SET Bidon = ?, precio_unitario = ? WHERE ID = ?';
    db.query(sqlUpdate, [nuevoStock, precioFinal, id], (err) => {
      if (err) {
        console.error('Error al actualizar producto:', err);
        return res.status(500).json({ mensaje: 'Error al actualizar producto' });
      }

      res.json({ 
        mensaje: 'Producto actualizado correctamente',
        nuevoStock: nuevoStock,
        precioActualizado: precioFinal
      });
    });
  });
});

export default router;