import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import styles from "./nav.module.css";
import logo from "../../assets/logo.png";

function Nav() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (

    <nav className={styles.nav}>

      <button className={styles.hamburguesa} onClick={toggleMenu}>
        <span className={`${styles.barra} ${menuAbierto ? styles.activa : ""}`}></span>
        <span className={`${styles.barra} ${menuAbierto ? styles.activa : ""}`}></span>
        <span className={`${styles.barra} ${menuAbierto ? styles.activa : ""}`}></span>
      </button>

      <img src={logo} alt="logo" className={styles.logo} />

      <div className={`${styles['menu-lateral']} ${menuAbierto ? styles.activo : ""}`}>
        <div className={styles.men}>
          <h2 className={styles.men2}>Menu</h2>
      </div>
        <span className={styles.linea}></span>
        <NavLink
          to="/inventario"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className={styles.botones} >Inventario</h2>
        </NavLink>
        <span className={styles.linea1}></span>

        <NavLink
          to="/registro_autos"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className={styles.botones}>Registro</h2>


        </NavLink>
        <span className={styles.linea1}></span>

        <NavLink
          to="/asistencia"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className={styles.botones}>Asistencia</h2>

        </NavLink>
        <span className={styles.linea1}></span>
        <NavLink
          to="/Empleados"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className={styles.botones}>empleados</h2>

        </NavLink>
        <span className={styles.linea1}></span>
        <NavLink
          to="/informes"
          className={({ isActive }) =>
            isActive
              ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
          }
          onClick={() => setMenuAbierto(false)}
        >
          <h2 className={styles.botones}>Informes</h2>

        </NavLink>
        <span className={styles.linea1}></span>
      </div>

      {menuAbierto && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </nav>
  );
}

export default Nav;
