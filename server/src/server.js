import express from 'express';
import dotenv from 'dotenv';
import inventarioRoutes from './routes/inventario.js';
import serviciosRoutes from "./routes/servicios.js";
import Asistencia from './routes/asistencias.js';
import Empleados from './routes/empleados.js'
import informes from './routes/informe.js'
import registroAutosRoutes from "./routes/registro_autos.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/servicios", serviciosRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/asistencias', Asistencia);
app.use('/api/empleado', Empleados);
app.use('/api/informes/',informes)
app.use('/api/registros', registroAutosRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
