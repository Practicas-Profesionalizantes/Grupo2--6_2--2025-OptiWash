import express from 'express';
import bd from '../db.js'; 

const router = express.Router();

router.get('/', (req, res) => {
  bd.query('select * from Empleado', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener usuarios',
      });
    }
    res.status(200).json({
      success: true,
      data: results,
    });
  });
});

export default router;
