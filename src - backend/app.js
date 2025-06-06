const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');


require('dotenv').config();

const app = express();
app.use(express.json());

const db  = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME,
});

app.get('/api/inventario/productos', (req, res) => {
  db.query('SELECT * FROM  Producto;', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error' });
    res.json(results); 
  });
});


app.post('/api/inventario/productos', (req, res) => {
  const { dato } = req.body;
  
  if (!dato) {
    return res.status(400).json({ error: 'Se requiere el dato' });
  }

  const query = 'INSERT INTO tabla (columna) VALUES (?)';
  
  db.query(query, [dato], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al guardar en BD' });
    }
    res.json({ mensaje: 'Dato guardado', id: result.insertId });
  });
});





const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});