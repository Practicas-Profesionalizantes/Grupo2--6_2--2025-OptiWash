import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./registro_autos.module.css";
import AñadirAutoRegistro from "../../componentes/Registro_Autos/añadir_autoRegistro.jsx";
import EditarAutoRegistro from "../../componentes/Registro_Autos/editar_autoRegistro.jsx";

function RegistroAuto() {
  const [registros, setRegistros] = useState([]);
  const [expandido, setExpandido] = useState({});
  const [seleccionado, setSeleccionado] = useState(null);
  const [mostrarAñadir, setMostrarAñadir] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);

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

  const toggleExpandir = (id) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const abrirEdicion = () => {
    if (!seleccionado) return;
    const registro = registros.find((r) => r.ID === seleccionado);
    setRegistroSeleccionado(registro);
    setMostrarEditar(true);
  };

  const cerrarEdicion = (recargar = false) => {
    setMostrarEditar(false);
    setRegistroSeleccionado(null);
    if (recargar) cargarRegistros();
  };

  const cerrarAñadir = (recargar = false) => {
    setMostrarAñadir(false);
    if (recargar) cargarRegistros();
  };

  return (
    <div className={styles["registro-container"]}>
      <div className={styles.acciones}>
        <button
          className={`${styles.btn} ${styles.editar}`}
          disabled={!seleccionado}
          onClick={abrirEdicion}
        >
          Editar
        </button>

        <button
          className={`${styles.btn} ${styles.anadir}`}
          onClick={() => setMostrarAñadir(true)}
        >
          Añadir
        </button>
      </div>

      <div className={styles["lista-registros"]}>
        {registros.map((r, index) => (
          <div className={styles["tarjeta-registro"]} key={r.ID}>
            <div className={styles["columna-id"]}>{registros.length - index}</div>

            <div className={styles.contenido}>
              <div className={styles.encabezado}>
                <span className={styles.modelo}>Modelo: {r.Modelo}</span>
                <span className={styles.precio}>Precio: {r.Precio.toLocaleString()}</span>

                <input
                  type="radio"
                  name="registroSeleccionado"
                  checked={seleccionado === r.ID}
                  onChange={() => setSeleccionado(r.ID)}
                  style={{ margin: "0 10px" }}
                />

                <button className={styles.toggle} onClick={() => toggleExpandir(r.ID)}>
                  {expandido[r.ID] ? "−" : "+"}
                </button>
              </div>

              {expandido[r.ID] && (
                <div className={styles.detalles}>
                  <div className={styles["fila-datos"]}>
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
                  <p className={styles.nota}>Nota: {r.nota || "----"}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🪟 Modal de añadir */}
      {mostrarAñadir && <AñadirAutoRegistro onClose={cerrarAñadir} />}

      {/* 🪟 Modal de editar */}
      {mostrarEditar && (
        <EditarAutoRegistro registro={registroSeleccionado} onClose={cerrarEdicion} />
      )}
    </div>
  );
}

export default RegistroAuto;
