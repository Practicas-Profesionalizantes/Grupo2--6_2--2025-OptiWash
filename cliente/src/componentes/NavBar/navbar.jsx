import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./nav.css";
import logo from "../../assets/logo.png";

function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    
    <nav className="nav">
      {/* Icono hamburguesa a la izquierda */}
      
      <button className="hamburguesa" onClick={toggleMenu}>
        <span className={`barra ${menuAbierto ? "activa" : ""}`}></span>
        <span className={`barra ${menuAbierto ? "activa" : ""}`}></span>
        <span className={`barra ${menuAbierto ? "activa" : ""}`}></span>
      </button>

      {/* Logo a la derecha */}
      <img src={logo} alt="logo" className="logo" />

      {/* Menú lateral izquierdo */}
      <div className={`menu-lateral ${menuAbierto ? "activo" : ""}`}>
        <div className="men">
          <h2 className=" men2">Menu</h2>
      </div>
        <span className="linea"></span>
        <NavLink
          to="/inventario"
          className={({ isActive }) =>
            isActive
              ? "navLink activeLink" : "navLink"
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className="botones" >Inventario</h2>
        </NavLink>
        <span className="linea1"></span>

        <NavLink
          to="/registro_autos"
          className={({ isActive }) =>
            isActive
              ? "navLink activeLink" : "navLink"
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className="botones">Registro</h2>


        </NavLink>
        <span className="linea1"></span>

        <NavLink
          to="/asistencia"
          className={({ isActive }) =>
            isActive
              ? "navLink activeLink" : "navLink"
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className="botones">Asistencia</h2>

        </NavLink>
        <span className="linea1"></span>
        <NavLink
          to="/Empleados"
          className={({ isActive }) =>
            isActive
              ? "navLink activeLink" : "navLink"
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className="botones">empleados</h2>

        </NavLink>
        <span className="linea1"></span>
        <NavLink
          to="/informes"
          className={({ isActive }) =>
            isActive
              ? "navLink activeLink" : "navLink"
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className="botones">Informes</h2>

        </NavLink>
        <span className="linea1"></span>
      </div>

      {/* Fondo semitransparente cuando el menú está activo */}
      {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}
    </nav>
  );
}

export default Nav;
