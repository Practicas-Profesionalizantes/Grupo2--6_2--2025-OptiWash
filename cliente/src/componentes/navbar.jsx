import { NavLink } from "react-router-dom";
import "../style/navbar/nav.css";
import styles from "../style/navbar/nav.module.css";
import React from "react";
import FechaHoraActual from "../componentes/FechaHoraActual.jsx";
import logo from "../img/logo.png";
import "../style/navbar/switch.css";

function Nav({ cambiarFondo, temaActual }) {
  return (
    <div className="nav">
      <div className="parte1">
        <img src={logo} alt="logo" />
        <div className="navboton">
          <NavLink
            to="/inventario"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            <h2 className="botones">Inventario</h2>
          </NavLink>
          <h2 className="deco">|</h2>
          <NavLink
            to="/registro_autos"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            <h2 className="botones">Registro</h2>
          </NavLink>
          <h2 className="deco">|</h2>
          <NavLink
            to="/asistencia"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink
            }
          >
            <h2 className="botones">Asistencia</h2>
          </NavLink>

        </div>
      </div>
          <div className="fecha-hora-centro">
            <FechaHoraActual/>
          </div>
          <div className="tema">
        <label htmlFor="theme" className="theme">
          <span className="theme__toggle-wrap">
            <input
              id="theme"
              className="theme__toggle"
              type="checkbox"
              role="switch"
              name="theme"
                onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                if (e.target.checked) {
                  cambiarFondo("#14212D");
                } else {
                  cambiarFondo("#ffffff");
                }
              }}
            />
            <span className="theme__fill"   onClick={(e) => e.stopPropagation()}/>
            <span className="theme__icon"  onClick={(e) => e.stopPropagation()}>
              <span className="theme__icon-part" />
              <span className="theme__icon-part" />
              <span className="theme__icon-part" />
              <span className="theme__icon-part" />
              <span className="theme__icon-part" />
              <span className="theme__icon-part" />
              <span className="theme__icon-part" />
              <span className="theme__icon-part" />
              <span className="theme__icon-part" />
            </span>
          </span>
        </label>
          </div>
    </div>
  );
}

export default Nav;
