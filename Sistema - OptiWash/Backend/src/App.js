const express = require('express');
const mysql = require('mysql2/promise');

const app = express();


app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Conectar a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando con Express y MySQL sin dotenv');
});

app.listen(3001, () => {
  console.log('Backend en http://localhost:3001');
});