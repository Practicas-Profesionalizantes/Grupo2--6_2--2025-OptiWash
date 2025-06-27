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
  console.log('Ruta PUT /actualizar llamada');
  console.log('ID:', req.params.id);
  console.log('litrosComprados:', req.body.litrosComprados);
  const id = parseInt(req.params.id);
  const litrosComprados = parseFloat(req.body.litrosComprados);
  
  if (isNaN(litrosComprados)) {
    res.status(400).send('El valor de litros no es válido');
    return;
  }
  
  // Paso 1: obtener litros actuales
  const sqlSelect = 'SELECT Litros FROM Producto WHERE ID = ?';
  db.query(sqlSelect, [id], (err, results) => {
    const litrosActuales = parseFloat(results[0].Litros);

    // Paso 2: calcular nuevo total
    const nuevoLitros = litrosActuales + litrosComprados;

    // Paso 3: validar que no sea negativo
    if (nuevoLitros < 0) {
      res.send('No puedes sacar más litros de los que hay');
      return;
    }

    // Paso 4: actualizar la tabla
    const sqlUpdate = 'UPDATE Producto SET Litros = ? WHERE ID = ?';
    db.query(sqlUpdate, [nuevoLitros, id], () => {
      res.send('Producto actualizado con nuevos litros');
    });
  });
});


export default router;