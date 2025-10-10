import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "../style/navbar/nav.css";
import styles from "../style/navbar/nav.module.css";
import logo from "../img/logo.png";

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
        <NavLink
          to="/inventario"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeLink}`
              : styles.navLink
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className="botones">Inventario</h2>
        </NavLink>

        <NavLink
          to="/registro_autos"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeLink}`
              : styles.navLink
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className="botones">Registro</h2>
        </NavLink>

        <NavLink
          to="/asistencia"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeLink}`
              : styles.navLink
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className="botones">Asistencia</h2>
        </NavLink>
      </div>

      {/* Fondo semitransparente cuando el menú está activo */}
      {menuAbierto && <div className="overlay" onClick={toggleMenu}></div>}
    </nav>
  );
}

export default Nav;
