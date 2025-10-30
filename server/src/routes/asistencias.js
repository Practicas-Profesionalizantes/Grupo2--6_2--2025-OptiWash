import express from "express";
import connection from "../db.js";

const router = express.Router();

router.get("/semana", (req, res) => {
  let { fecha } = req.query;
  if (!fecha) fecha = new Date().toISOString().split("T")[0];

  const sql = `
    SELECT DISTINCT
      e.ID AS empleado_id,
      e.Nombre AS empleado,
      DATE(semana.fecha) AS fecha,
      MAX(a.ID_) AS asistencia_id,
      MAX(a.estado) AS estado,
      MAX(p.ID_) AS pagado_id,
      MAX(p.Pagado) AS pagado,
      MAX(v.ID_) AS vale_id,
      MAX(v.vale) AS vale
    FROM Empleado e
    CROSS JOIN (
      SELECT DATE_SUB(?, INTERVAL WEEKDAY(?) DAY) + INTERVAL 0 DAY AS fecha
      UNION ALL
      SELECT DATE_SUB(?, INTERVAL WEEKDAY(?) DAY) + INTERVAL 1 DAY
      UNION ALL
      SELECT DATE_SUB(?, INTERVAL WEEKDAY(?) DAY) + INTERVAL 2 DAY
      UNION ALL
      SELECT DATE_SUB(?, INTERVAL WEEKDAY(?) DAY) + INTERVAL 3 DAY
      UNION ALL
      SELECT DATE_SUB(?, INTERVAL WEEKDAY(?) DAY) + INTERVAL 4 DAY
      UNION ALL
      SELECT DATE_SUB(?, INTERVAL WEEKDAY(?) DAY) + INTERVAL 5 DAY
    ) semana
    LEFT JOIN Asistencia a 
      ON a.ID_Empleado = e.ID 
      AND DATE(a.Fecha_hora) = semana.fecha
    LEFT JOIN Pagado p 
      ON p.ID_Empleado = e.ID 
      AND DATE(p.Fecha_hora) = semana.fecha
    LEFT JOIN Vale v 
      ON v.ID_Empleado = e.ID 
      AND DATE(v.Fecha_hora) = semana.fecha
    GROUP BY e.ID, e.Nombre, DATE(semana.fecha)
    ORDER BY e.Nombre, DATE(semana.fecha)
  `;

  connection.query(sql, [fecha, fecha, fecha, fecha, fecha, fecha, fecha, fecha, fecha, fecha, fecha, fecha], (err, rows) => {
    if (err) {
      console.error("Error en query:", err);
      return res.status(500).json({ error: err.message });
    }

    const formattedData = rows.map(row => ({
      empleado_id: row.empleado_id,
      empleado: row.empleado,
      fecha: row.fecha,
      asistencia_id: row.asistencia_id,
      estado: row.estado || null,
      pagado_id: row.pagado_id,
      pagado: row.pagado !== null ? Boolean(row.pagado) : null,
      vale_id: row.vale_id,
      vale: row.vale || null
    }));

    res.json({ data: formattedData });
  });
});


router.post("/crear", (req, res) => {
  const { empleadoId, fecha, estado, pagado, vale } = req.body;

  if (!empleadoId || !fecha) {
    return res.status(400).json({ 
      error: "empleadoId y fecha son obligatorios" 
    });
  }

  const fechaHora = `${fecha} ${new Date().toTimeString().split(' ')[0]}`;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error al iniciar transacción:", err);
      return res.status(500).json({ error: err.message });
    }

    const queryPromises = [];

    if (estado) {
      const sqlAsistencia = `
        INSERT INTO Asistencia (ID_Empleado, Fecha_hora, estado)
        VALUES (?, ?, ?)
      `;
      queryPromises.push(
        new Promise((resolve, reject) => {
          connection.query(
            sqlAsistencia, 
            [empleadoId, fechaHora, estado],
            (err, result) => err ? reject(err) : resolve(result)
          );
        })
      );
    }

    const sqlPagado = `
      INSERT INTO Pagado (ID_Empleado, Fecha_hora, Pagado)
      VALUES (?, ?, ?)
    `;
    queryPromises.push(
      new Promise((resolve, reject) => {
        connection.query(
          sqlPagado,
          [empleadoId, fechaHora, pagado ? 1 : 0],
          (err, result) => err ? reject(err) : resolve(result)
        );
      })
    );

    if (vale && vale > 0) {
      const sqlVale = `
        INSERT INTO Vale (ID_Empleado, Fecha_hora, vale)
        VALUES (?, ?, ?)
      `;
      queryPromises.push(
        new Promise((resolve, reject) => {
          connection.query(
            sqlVale,
            [empleadoId, fechaHora, vale],
            (err, result) => err ? reject(err) : resolve(result)
          );
        })
      );
    }

    Promise.all(queryPromises)
      .then(() => {
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              console.error("Error al hacer commit:", err);
              res.status(500).json({ error: err.message });
            });
          }
          res.json({ 
            success: true, 
            message: "Asistencia guardada correctamente" 
          });
        });
      })
      .catch((err) => {
        connection.rollback(() => {
          console.error("Error en queries:", err);
          res.status(500).json({ error: err.message });
        });
      });
  });
});


router.put("/actualizar", (req, res) => {
  const { 
    empleadoId, 
    fecha, 
    estado, 
    pagado, 
    vale,
    asistenciaId,
    pagadoId,
    valeId
  } = req.body;

  if (!empleadoId || !fecha) {
    return res.status(400).json({ 
      error: "empleadoId y fecha son obligatorios" 
    });
  }

  const fechaHora = `${fecha} ${new Date().toTimeString().split(' ')[0]}`;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error al iniciar transacción:", err);
      return res.status(500).json({ error: err.message });
    }

    const queryPromises = [];

    if (estado) {
      if (asistenciaId) {
        const sqlUpdate = `UPDATE Asistencia SET estado = ? WHERE ID_ = ?`;
        queryPromises.push(
          new Promise((resolve, reject) => {
            connection.query(sqlUpdate, [estado, asistenciaId], 
              (err, result) => err ? reject(err) : resolve(result)
            );
          })
        );
      } else {
        const sqlInsert = `
          INSERT INTO Asistencia (ID_Empleado, Fecha_hora, estado)
          VALUES (?, ?, ?)
        `;
        queryPromises.push(
          new Promise((resolve, reject) => {
            connection.query(sqlInsert, [empleadoId, fechaHora, estado],
              (err, result) => err ? reject(err) : resolve(result)
            );
          })
        );
      }
    } else if (asistenciaId) {
      const sqlDelete = `DELETE FROM Asistencia WHERE ID_ = ?`;
      queryPromises.push(
        new Promise((resolve, reject) => {
          connection.query(sqlDelete, [asistenciaId],
            (err, result) => err ? reject(err) : resolve(result)
          );
        })
      );
    }

    if (pagadoId) {
      const sqlUpdate = `UPDATE Pagado SET Pagado = ? WHERE ID_ = ?`;
      queryPromises.push(
        new Promise((resolve, reject) => {
          connection.query(sqlUpdate, [pagado ? 1 : 0, pagadoId],
            (err, result) => err ? reject(err) : resolve(result)
          );
        })
      );
    } else {
      const sqlInsert = `
        INSERT INTO Pagado (ID_Empleado, Fecha_hora, Pagado)
        VALUES (?, ?, ?)
      `;
      queryPromises.push(
        new Promise((resolve, reject) => {
          connection.query(sqlInsert, [empleadoId, fechaHora, pagado ? 1 : 0],
            (err, result) => err ? reject(err) : resolve(result)
          );
        })
      );
    }

    if (vale && vale > 0) {
      if (valeId) {
        const sqlUpdate = `UPDATE Vale SET vale = ? WHERE ID_ = ?`;
        queryPromises.push(
          new Promise((resolve, reject) => {
            connection.query(sqlUpdate, [vale, valeId],
              (err, result) => err ? reject(err) : resolve(result)
            );
          })
        );
      } else {
        const sqlInsert = `
          INSERT INTO Vale (ID_Empleado, Fecha_hora, vale)
          VALUES (?, ?, ?)
        `;
        queryPromises.push(
          new Promise((resolve, reject) => {
            connection.query(sqlInsert, [empleadoId, fechaHora, vale],
              (err, result) => err ? reject(err) : resolve(result)
            );
          })
        );
      }
    } else if (valeId) {
      const sqlDelete = `DELETE FROM Vale WHERE ID_ = ?`;
      queryPromises.push(
        new Promise((resolve, reject) => {
          connection.query(sqlDelete, [valeId],
            (err, result) => err ? reject(err) : resolve(result)
          );
        })
      );
    }

    Promise.all(queryPromises)
      .then(() => {
        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              console.error("Error al hacer commit:", err);
              res.status(500).json({ error: err.message });
            });
          }
          res.json({ 
            success: true, 
            message: "Asistencia actualizada correctamente" 
          });
        });
      })
      .catch((err) => {
        connection.rollback(() => {
          console.error("Error en queries:", err);
          res.status(500).json({ error: err.message });
        });
      });
  });
});

export default router;