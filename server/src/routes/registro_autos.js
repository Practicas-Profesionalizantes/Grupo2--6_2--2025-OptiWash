// routes/registro_autos.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// ==========================
// GET: traer todos los registros
// ==========================
router.get('/', (req, res) => {
  const sql = `
    SELECT r.ID, c.ID AS ID_Cliente, v.ID AS ID_Vehiculo, s.ID AS ID_Servicio,
           c.Nombre AS Cliente, v.Marca AS Modelo, v.Patente, c.Telefono, 
           s.Tipo_Servicio, s.Precio
    FROM Registro_Lavado r
    JOIN Cliente c ON r.ID_Cliente = c.ID
    JOIN Vehiculo v ON r.ID_Vehiculo = v.ID
    JOIN Servicio s ON r.ID_Servicio = s.ID
    ORDER BY r.Fecha_Hora DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener registros' });
    res.json(results);
  });
});

// ==========================
// POST: crear un nuevo registro
// ==========================
router.post('/', (req, res) => {
  const { cliente, modelo, patente, telefono, id_servicio } = req.body;

  if (!cliente || !modelo || !patente || !telefono || !id_servicio) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  // 1. Insertar cliente
  db.query(
    'INSERT INTO Cliente (Nombre, Telefono) VALUES (?, ?)',
    [cliente, telefono],
    (err, resultCliente) => {
      if (err) return res.status(500).json({ mensaje: 'Error al crear cliente' });
      const id_cliente = resultCliente.insertId;

      // 2. Insertar vehículo
      db.query(
        'INSERT INTO Vehiculo (ID_Cliente, Patente, Marca) VALUES (?, ?, ?)',
        [id_cliente, patente, modelo],
        (err, resultVehiculo) => {
          if (err) return res.status(500).json({ mensaje: 'Error al crear vehículo' });
          const id_vehiculo = resultVehiculo.insertId;

          // 3. Insertar registro de lavado
          db.query(
            'INSERT INTO Registro_Lavado (ID_Cliente, ID_Vehiculo, ID_Servicio) VALUES (?, ?, ?)',
            [id_cliente, id_vehiculo, id_servicio],
            (err, resultRegistro) => {
              if (err) return res.status(500).json({ mensaje: 'Error al crear registro' });
              res.json({ mensaje: 'Registro agregado', id: resultRegistro.insertId });
            }
          );
        }
      );
    }
  );
});

// ==========================
// PUT: actualizar un registro existente
// ==========================
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { cliente, modelo, patente, telefono, id_servicio } = req.body;

  if (!cliente || !modelo || !patente || !telefono || !id_servicio) {
    return res.status(400).json({ mensaje: 'Faltan datos' });
  }

  // Buscar IDs relacionados
  db.query(
    'SELECT ID_Cliente, ID_Vehiculo FROM Registro_Lavado WHERE ID = ?',
    [id],
    (err, registros) => {
      if (err || registros.length === 0) {
        return res.status(404).json({ mensaje: 'Registro no encontrado' });
      }

      const id_cliente = registros[0].ID_Cliente;
      const id_vehiculo = registros[0].ID_Vehiculo;

      // Actualizar cliente
      db.query('UPDATE Cliente SET Nombre = ?, Telefono = ? WHERE ID = ?', [
        cliente,
        telefono,
        id_cliente,
      ]);

      // Actualizar vehículo
      db.query('UPDATE Vehiculo SET Marca = ?, Patente = ? WHERE ID = ?', [
        modelo,
        patente,
        id_vehiculo,
      ]);

      // Actualizar servicio
      db.query(
        'UPDATE Registro_Lavado SET ID_Servicio = ? WHERE ID = ?',
        [id_servicio, id],
        (err) => {
          if (err) return res.status(500).json({ mensaje: 'Error al actualizar registro' });
          res.json({ mensaje: 'Registro actualizado' });
        }
      );
    }
  );
});

// ==========================
// DELETE: eliminar un registro
// ==========================
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Registro_Lavado WHERE ID = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar registro' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    res.json({ mensaje: 'Registro eliminado' });
  });
});

export default router;
