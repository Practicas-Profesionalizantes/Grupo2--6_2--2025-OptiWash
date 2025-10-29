import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

import inventarioRoutes from './routes/inventario.js';
import registroAutosRoutes from "./routes/registro_autos.js";
import serviciosRoutes from "./routes/servicios.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/servicios", serviciosRoutes);
app.use("/api/registros", registroAutosRoutes);
app.use('/api/inventario', inventarioRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
