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



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});