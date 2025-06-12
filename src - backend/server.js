import express from 'express';
import dotenv from 'dotenv';
import router from './routes/inventario.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/inventario', router);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
