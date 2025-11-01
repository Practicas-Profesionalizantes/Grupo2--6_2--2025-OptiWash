
import express from "express";
import db from "../db.js";

const router = express.Router();




router.get("/", (req, res) => {
  const sql = "SELECT * FROM Empleado ORDER BY ID DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ mensaje: "Error al obtener empleados" });
    res.json(results);
  });
});




router.post("/", (req, res) => {
  const { Nombre, Cargo, celular } = req.body;

  if (!Nombre || !Cargo || !celular) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  const sql = "INSERT INTO Empleado (Nombre, Cargo, celular) VALUES (?, ?, ?)";
  db.query(sql, [Nombre, Cargo, celular], (err, result) => {
    if (err) return res.status(500).json({ mensaje: "Error al crear empleado" });
    res.json({ mensaje: "✅ Empleado agregado correctamente", id: result.insertId });
  });
});




router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { Nombre, Cargo, celular } = req.body;

  if (!Nombre || !Cargo || !celular) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  const sql = "UPDATE Empleado SET Nombre = ?, Cargo = ?, celular = ? WHERE ID = ?";
  db.query(sql, [Nombre, Cargo, celular, id], (err) => {
    if (err) return res.status(500).json({ mensaje: "Error al actualizar empleado" });
    res.json({ mensaje: "✏️ Empleado actualizado correctamente" });
  });
});




router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Empleado WHERE ID = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ mensaje: "Error al eliminar empleado" });
    res.json({ mensaje: "🗑️ Empleado eliminado correctamente" });
  });
});

export default router;
