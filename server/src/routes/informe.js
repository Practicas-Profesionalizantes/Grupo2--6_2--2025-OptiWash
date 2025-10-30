// routes/informe.js
import express from 'express';
import bd from '../db.js';
const router = express.Router();

// IMPORTANTE: Las rutas específicas van PRIMERO, antes de las rutas con parámetros

// Obtener detalle de lavados por rango de fechas
router.get('/autos/detalle', (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  
  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({
      success: false,
      message: 'Se requieren fecha_inicio y fecha_fin'
    });
  }
  
  const query = `
    SELECT 
      c.Nombre,
      v.Patente,
      s.Tipo_Servicio,
      s.Precio,
      rl.Fecha_Hora,
      rl.nota
    FROM Registro_Lavado rl
    JOIN Cliente c ON rl.ID_Cliente = c.ID
    JOIN Vehiculo v ON rl.ID_Vehiculo = v.ID
    JOIN Servicio s ON rl.ID_Servicio = s.ID
    WHERE DATE(rl.Fecha_Hora) BETWEEN ? AND ?
    ORDER BY rl.Fecha_Hora DESC
  `;
  
  console.log('Consultando lavados entre:', fecha_inicio, 'y', fecha_fin);
  
  bd.query(query, [fecha_inicio, fecha_fin], (err, results) => {
    if (err) {
      console.error('Error al obtener detalle de lavados:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener detalle de lavados',
      });
    }
    console.log('Lavados encontrados:', results.length);
    res.status(200).json(results);
  });
});

// Obtener informes de autos agrupados por período
router.get('/autos/:agrupacion', (req, res) => {
  const { agrupacion } = req.params;
  
  let query;
  if (agrupacion === 'semana') {
    query = `
      SELECT 
        YEARWEEK(Fecha_Hora, 1) as periodo,
        MIN(DATE(Fecha_Hora)) as fecha_inicio,
        MAX(DATE(Fecha_Hora)) as fecha_fin,
        COUNT(*) as total_lavados,
        SUM(s.Precio) as ingresos_total
      FROM Registro_Lavado rl
      JOIN Servicio s ON rl.ID_Servicio = s.ID
      GROUP BY YEARWEEK(Fecha_Hora, 1)
      ORDER BY periodo DESC
    `;
  } else {
    query = `
      SELECT 
        DATE_FORMAT(Fecha_Hora, '%Y-%m') as periodo,
        MIN(DATE(Fecha_Hora)) as fecha_inicio,
        MAX(DATE(Fecha_Hora)) as fecha_fin,
        COUNT(*) as total_lavados,
        SUM(s.Precio) as ingresos_total
      FROM Registro_Lavado rl
      JOIN Servicio s ON rl.ID_Servicio = s.ID
      GROUP BY DATE_FORMAT(Fecha_Hora, '%Y-%m')
      ORDER BY periodo DESC
    `;
  }
  
  bd.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener informes de autos:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener informes de autos',
      });
    }
    res.status(200).json(results);
  });
});


// Obtener detalle de asistencias por rango de fechas
router.get('/asistencias/detalle', (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;
  
  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({
      success: false,
      message: 'Se requieren fecha_inicio y fecha_fin'
    });
  }
  
  const query = `
    SELECT 
      e.ID as ID_Empleado,
      e.Nombre,
      e.Cargo,
      a.estado,
      a.Fecha_hora
    FROM Asistencia a
    JOIN Empleado e ON a.ID_Empleado = e.ID
    WHERE DATE(a.Fecha_hora) BETWEEN ? AND ?
    ORDER BY e.Nombre, a.Fecha_hora DESC
  `;
  
  console.log('Consultando asistencias entre:', fecha_inicio, 'y', fecha_fin);
  
  bd.query(query, [fecha_inicio, fecha_fin], (err, results) => {
    if (err) {
      console.error('Error al obtener detalle de asistencias:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener detalle de asistencias',
      });
    }
    console.log('Asistencias encontradas:', results.length);
    res.status(200).json(results);
  });
});

// Obtener informes de asistencias agrupados por período
router.get('/asistencias/:agrupacion', (req, res) => {
  const { agrupacion } = req.params;
  
  let query;
  if (agrupacion === 'semana') {
    query = `
      SELECT 
        YEARWEEK(Fecha_hora, 1) as periodo,
        MIN(DATE(Fecha_hora)) as fecha_inicio,
        MAX(DATE(Fecha_hora)) as fecha_fin,
        COUNT(*) as total_registros,
        SUM(CASE WHEN estado = 'Presente' THEN 1 ELSE 0 END) as presentes,
        SUM(CASE WHEN estado = 'Tarde' THEN 1 ELSE 0 END) as tardes,
        SUM(CASE WHEN estado = 'Ausente' THEN 1 ELSE 0 END) as ausentes
      FROM Asistencia
      GROUP BY YEARWEEK(Fecha_hora, 1)
      ORDER BY periodo DESC
    `;
  } else {
    query = `
      SELECT 
        DATE_FORMAT(Fecha_hora, '%Y-%m') as periodo,
        MIN(DATE(Fecha_hora)) as fecha_inicio,
        MAX(DATE(Fecha_hora)) as fecha_fin,
        COUNT(*) as total_registros,
        SUM(CASE WHEN estado = 'Presente' THEN 1 ELSE 0 END) as presentes,
        SUM(CASE WHEN estado = 'Tarde' THEN 1 ELSE 0 END) as tardes,
        SUM(CASE WHEN estado = 'Ausente' THEN 1 ELSE 0 END) as ausentes
      FROM Asistencia
      GROUP BY DATE_FORMAT(Fecha_hora, '%Y-%m')
      ORDER BY periodo DESC
    `;
  }
  
  bd.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener informes de asistencias:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener informes de asistencias',
      });
    }
    res.status(200).json(results);
  });
});

// Obtener detalle de inventario por rango de fechas
router.get('/inventario/detalle', (req, res) => {
  const { fecha_inicio, fecha_fin, tipo } = req.query;
  
  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({
      success: false,
      message: 'Se requieren fecha_inicio y fecha_fin'
    });
  }

  const tipoMovimiento = tipo === 'inversion' ? 'Entrada' : 'Salida';
  
  const query = `
    SELECT 
      p.Nombre,
      COALESCE(SUM(mi.Bidon), 0) as total_movimiento,
      COALESCE(AVG(mi.precio_momento), p.precio_unitario) as precio_unitario
    FROM Producto p
    LEFT JOIN Movimiento_Inventario mi ON p.ID = mi.ID_Producto 
      AND mi.Tipo = ?
      AND DATE(mi.Fecha) BETWEEN ? AND ?
    GROUP BY p.ID, p.Nombre, p.precio_unitario
    HAVING total_movimiento > 0
    ORDER BY p.Nombre
  `;
  
  console.log('Consultando inventario entre:', fecha_inicio, 'y', fecha_fin, '- Tipo:', tipoMovimiento);
  
  bd.query(query, [tipoMovimiento, fecha_inicio, fecha_fin], (err, results) => {
    if (err) {
      console.error('Error al obtener detalle de inventario:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener detalle de inventario',
      });
    }
    console.log('Movimientos encontrados:', results.length);
    res.status(200).json(results);
  });
});

// Obtener informes de inventario agrupados por período
router.get('/inventario/:agrupacion', (req, res) => {
  const { agrupacion } = req.params;
  
  let query;
  if (agrupacion === 'semana') {
    query = `
      SELECT 
        YEARWEEK(Fecha, 1) as periodo,
        MIN(DATE(Fecha)) as fecha_inicio,
        MAX(DATE(Fecha)) as fecha_fin,
        COUNT(*) as total_movimientos,
        SUM(CASE WHEN Tipo = 'Entrada' THEN Bidon ELSE 0 END) as total_entradas,
        SUM(CASE WHEN Tipo = 'Salida' THEN Bidon ELSE 0 END) as total_salidas
      FROM Movimiento_Inventario
      GROUP BY YEARWEEK(Fecha, 1)
      ORDER BY periodo DESC
    `;
  } else {
    query = `
      SELECT 
        DATE_FORMAT(Fecha, '%Y-%m') as periodo,
        MIN(DATE(Fecha)) as fecha_inicio,
        MAX(DATE(Fecha)) as fecha_fin,
        COUNT(*) as total_movimientos,
        SUM(CASE WHEN Tipo = 'Entrada' THEN Bidon ELSE 0 END) as total_entradas,
        SUM(CASE WHEN Tipo = 'Salida' THEN Bidon ELSE 0 END) as total_salidas
      FROM Movimiento_Inventario
      GROUP BY DATE_FORMAT(Fecha, '%Y-%m')
      ORDER BY periodo DESC
    `;
  }
  
  bd.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener informes de inventario:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener informes de inventario',
      });
    }
    res.status(200).json(results);
  });
});

export default router;