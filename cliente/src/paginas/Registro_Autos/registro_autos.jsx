import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./registro_autos.module.css";
import { Link, useLocation } from "react-router-dom";

function RegistroAuto() {
  const [registros, setRegistros] = useState([]);
  const [expandido, setExpandido] = useState({});
  const [notificacion, setNotificacion] = useState(""); // 🔔 estado para el mensaje
  const location = useLocation();

  const cargarRegistros = async () => {
    try {
      const res = await axios.get("/api/registros");
      setRegistros(res.data);
    } catch (e) {
      console.error("Error al obtener registros", e);
    }
  };

  useEffect(() => {
    cargarRegistros();
  }, []);

  // 👇 Detecta si venís desde editar.jsx con un nuevo registro
  useEffect(() => {
    if (location.state?.nuevo) {
      cargarRegistros(); // recarga la lista
      setNotificacion(location.state.mensaje || "✅ Registro agregado correctamente");
      window.history.replaceState({}, document.title); // limpia el estado

      // Oculta el mensaje después de 3s
      setTimeout(() => setNotificacion(""), 3000);
    }
    if (location.state?.error) {
      setNotificacion(location.state.error);
      window.history.replaceState({}, document.title);
      setTimeout(() => setNotificacion(""), 3000);
    }
  }, [location.state]);

  const toggleExpandir = (id) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={styles['registro-container']}>
      {/* 🔔 Notificación flotante */}
      {notificacion && <div className={styles.notificacion}>{notificacion}</div>}

      <div className={styles.acciones}>
        <Link to="/editar" style={{ textDecoration: "none" }}>
          <button className={`${styles.btn} ${styles.editar}`}>Editar</button>
        </Link>
        <Link to="/editar" style={{ textDecoration: "none" }}>
          <button className={`${styles.btn} ${styles.anadir}`}>Añadir</button>
        </Link>
      </div>

      <div className={styles['lista-registros']}>
        {registros.map((r, index) => (
          <div className={styles['tarjeta-registro']} key={r.ID}>
            <div className={styles['columna-id']}>{registros.length - index}</div>

            <div className={styles.contenido}>
              <div className={styles.encabezado}>
                <span className={styles.modelo}>Modelo: {r.Modelo}</span>
                <span className={styles.precio}>Precio: {r.Precio.toLocaleString()}</span>
                <button className={styles.toggle} onClick={() => toggleExpandir(r.ID)}>
                  {expandido[r.ID] ? "−" : "+"}
                </button>
              </div>

              {expandido[r.ID] && (
                <div className={styles.detalles}>
                  <div className={styles['fila-datos']}>
                    <span className={styles.nombre}>
                      <strong>{r.Cliente || "Sin Nombre"}</strong>
                    </span>
                    <span className={styles.separador}>|</span>
                    <span className={styles.patente}>{r.Patente || "Sin Patente"}</span>
                    <span className={styles.separador}>|</span>
                    <span className={styles.telefono}>
                      {r.Telefono ? `+${r.Telefono}` : "Sin N° celular"}
                    </span>
                  </div>
                  <p className={styles.nota}>Nota: {r.Nota || "----"}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegistroAuto;
