import { Routes, Route, BrowserRouter } from "react-router-dom";
import Inventario from "./paginas/inventario";
import Home from "./paginas/home";
import Registro_de_autos from "./paginas/Registro de autos";

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
        <Route path="/inventario" element={<Inventario></Inventario>}/>
        <Route path="/" element={<Home></Home>}/>
        <Route path="/registro_de_autos" element={<Registro_de_autos></Registro_de_autos>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
