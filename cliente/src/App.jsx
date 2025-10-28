import { useState} from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Inventario from "./paginas/inventario";
import Home from "./paginas/home";
import Asistencia from "./paginas/asistencias";
import Registro_autos from "./paginas/registro_autos";
import Nav from "./componentes/navbar";
import Editar from "./componentes/editar"; // o el componente que quieras abrir


function App() {
  const [tema, setTema] = useState('#ffffff');

  const cambiarFondo = (color) => {
    setTema(color);
    localStorage.setItem('tema', color);
  };

  return (
      <BrowserRouter>
        <div
          style={{backgroundColor: tema, transition: 'background-color 0.5s ease, color 0.5s ease', minHeight: '100vh'}} className="app">
          <Nav cambiarFondo={cambiarFondo} temaActual={tema} />
          
            <Routes>
              <Route path="/" element={<Home></Home>}/>
              <Route path="/inventario" element={<Inventario />}/>
              <Route path="/asistencia" element={<Asistencia />}/>
              <Route path="/registro_autos" element={<Registro_autos />}/>
              <Route path="/editar" element={<Editar />} />
            </Routes>
          
        </div>
      </BrowserRouter>
  );
}

export default App;