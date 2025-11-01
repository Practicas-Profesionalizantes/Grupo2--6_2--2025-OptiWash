import { Routes, Route, BrowserRouter } from "react-router-dom";
import Inventario from "./paginas/inventario/inventario.jsx";
import Home from "./paginas/Home/home";
import Asistencia from "./paginas/Asistencias/asistencias";
import Nav from "./componentes/NavBar/navbar.jsx";
import VistaDetallada from "./componentes/Asistencias/vistaDetallada.jsx";
import InformeMenu from "./paginas/Informe/informeMenu.jsx";
import DetalleInformeAutos from "./paginas/Informe/Autos-Lavados/detalleinformeAutos.jsx";
import DetalleInformeAsistencias from "./paginas/Informe/asistencias/DetalleInformeAsistencia.jsx";
import DetalleInformeInventario from "./paginas/Informe/inventario/DetalleInformeInventario.jsx";
import Empleados from "./paginas/Empleados/empleados.jsx";
import "./app.css";
import RegistroAuto from "./paginas/Registro_Autos/registro_autos.jsx";
import Añadir_empleado from "./componentes/añadir_empleado/añadir_empleado.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/inventario" element={<Inventario></Inventario>} />
        <Route path="/asistencia" element={<Asistencia></Asistencia>} />

        <Route path="/vista" element={<VistaDetallada></VistaDetallada>} />

        <Route path="/informes" element={<InformeMenu></InformeMenu>} />
        <Route
          path="/informes/autos/detalle"
          element={<DetalleInformeAutos />}
        />
        <Route
          path="/informes/asistencias/detalle"
          element={<DetalleInformeAsistencias />}
        />
        <Route
          path="/informes/inventario/detalle"
          element={<DetalleInformeInventario />}
        />
        <Route path="/aniadir_empleado" element={<Añadir_empleado />} />

        <Route path="/empleados" element={<Empleados />} />
        <Route path="/registro_autos" element={<RegistroAuto></RegistroAuto>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
