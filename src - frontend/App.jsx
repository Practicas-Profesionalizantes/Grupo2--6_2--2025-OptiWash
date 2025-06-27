import { Routes, Route, BrowserRouter } from "react-router-dom";
import Inventario from "./paginas/inventario";
import Home from "./paginas/home";
import Asistencia from "./paginas/asistencias";
import Registro_autos from "./paginas/registro_autos";

/*
Mysql = npm i mysql2
Express = npm i express
reacat router doom = npm i react-router-dom
dotenv = npm install dotenv
*/

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/inventario" element={<Inventario></Inventario>}/>
        <Route path="/asistencia" element={<Asistencia></Asistencia>}/>
        <Route path="/registro_autos" element={<Registro_autos></Registro_autos>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
