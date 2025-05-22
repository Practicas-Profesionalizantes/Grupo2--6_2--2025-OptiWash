import { Routes, Route, BrowserRouter } from "react-router-dom";
import Inventario from "./paginas/inventario";
import Home from "./paginas/home";

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
