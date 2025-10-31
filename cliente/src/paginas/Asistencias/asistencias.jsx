import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./asistencia.module.css";

import imgPresente from "../../assets/asistencia/presente.png";
import imgAusente from "../../assets/asistencia/ausente.png";
import imgTarde from "../../assets/asistencia/tarde.png";
import imgVale from "../../assets/asistencia/vale.png";
import imgPagado from "../../assets/asistencia/pagado.png";

import VistaDetallada from "../../componentes/Asistencias/vistaDetallada";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const Asistencia = () => {
  const [asistencias, setAsistencias] = useState([]);
  const [rango, setRango] = useState("");
  const [lunes, setLunes] = useState(new Date());
  const [esSemanaActual, setEsSemanaActual] = useState(true);
  const [cargando, setCargando] = useState(false);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [columnaSeleccionada, setColumnaSeleccionada] = useState(null);

  const fetchAsistencias = async (fecha) => {
    setCargando(true);
    try {
      const fechaStr = fecha.toISOString().split("T")[0];
      const resp = await axios.get(`/api/asistencias/semana?fecha=${fechaStr}`);
      setAsistencias(resp.data.data || []);
    } catch (err) {
      console.error("Error al cargar asistencias:", err);
      setAsistencias([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const hoy = new Date();
    const lunesActual = new Date(hoy);
    const diaSemana = hoy.getDay();
    const diasDesdeHoy = diaSemana === 0 ? -6 : 1 - diaSemana;
    lunesActual.setDate(hoy.getDate() + diasDesdeHoy);

    setLunes(lunesActual);
    fetchAsistencias(lunesActual);

    const finSemana = new Date(lunesActual);
    finSemana.setDate(lunesActual.getDate() + 5);
    setRango(`${formatearFecha(lunesActual)} - ${formatearFecha(finSemana)}`);
    setEsSemanaActual(true);
  }, []);

  const formatearFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const cambiarSemana = (direccion) => {
    const nuevoLunes = new Date(lunes);
    nuevoLunes.setDate(lunes.getDate() + direccion * 7);
    setLunes(nuevoLunes);
    fetchAsistencias(nuevoLunes);

    const finSemana = new Date(nuevoLunes);
    finSemana.setDate(nuevoLunes.getDate() + 5);
    setRango(`${formatearFecha(nuevoLunes)} - ${formatearFecha(finSemana)}`);

    const hoy = new Date();
    const lunesActual = new Date(hoy);
    const diaSemana = hoy.getDay();
    const diasDesdeHoy = diaSemana === 0 ? -6 : 1 - diaSemana;
    lunesActual.setDate(hoy.getDate() + diasDesdeHoy);

    setEsSemanaActual(formatearFecha(nuevoLunes) === formatearFecha(lunesActual));
  };

  const empleadosAgrupados = {};
  asistencias.forEach((item) => {
    if (!item.empleado) return;
    const nombre = item.empleado;
    const fechaObj = item.fecha instanceof Date ? item.fecha : new Date(item.fecha);
    const fechaStr = fechaObj.toISOString().split("T")[0];
    if (!empleadosAgrupados[nombre]) empleadosAgrupados[nombre] = {};
    if (!empleadosAgrupados[nombre][fechaStr])
      empleadosAgrupados[nombre][fechaStr] = { estado: null, pagado: null, vale: null };
    if (item.estado) empleadosAgrupados[nombre][fechaStr].estado = item.estado;
    if (item.pagado !== null && item.pagado !== undefined)
      empleadosAgrupados[nombre][fechaStr].pagado = item.pagado;
    if (item.vale !== null && item.vale !== undefined)
      empleadosAgrupados[nombre][fechaStr].vale = item.vale;
  });

  const renderizarIconos = (info) => {
    const elementos = [];
    
    if (info.estado) {
      let imgAsistencia = null;
      if (info.estado === "Presente") imgAsistencia = imgPresente;
      else if (info.estado === "Ausente") imgAsistencia = imgAusente;
      else if (info.estado === "Tarde") imgAsistencia = imgTarde;
      if (imgAsistencia)
        elementos.push(
          <img key="asistencia" src={imgAsistencia} alt={info.estado} className={styles['icono-asistencia']} />
        );
    }


    if (info.vale && info.vale > 0)
      elementos.push(<img key="vale" src={imgVale} alt="Vale" className={styles['icono-vale']} />);

    if (info.pagado === true)
      elementos.push(<img key="pagado" src={imgPagado} alt="Pagado" className={styles['icono-pagado']} />);

    return elementos.length > 0 ? <div className={styles['contenedor-iconos']}>{elementos}</div> : <span>-</span>;
  };

  const manejarClick = (indiceDia) => {
    setColumnaSeleccionada(indiceDia);
    
    setTimeout(() => {
      setColumnaSeleccionada(null);
    }, 300);

    const diaFecha = new Date(lunes);
    diaFecha.setDate(lunes.getDate() + indiceDia);
    const diaStr = formatearFecha(diaFecha);
    setFechaSeleccionada(diaStr);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setFechaSeleccionada(null);
  };

  const handleGuardar = () => {
    fetchAsistencias(lunes);
    cerrarModal();
  };

  return (
    <div className={styles['contenedor-asistencia']}>
      <div className={styles.navegacion}>
        <button onClick={() => cambiarSemana(-1)} disabled={cargando}>←</button>
        <span>{rango}</span>
        <button onClick={() => cambiarSemana(1)} disabled={cargando}>→</button>
      </div>

      {esSemanaActual && (
        <p style={{ color: "green", textAlign: "center", fontWeight: "bold" }}>Semana actual</p>
      )}

      {cargando ? (
        <p style={{ textAlign: "center" }}>Cargando...</p>
      ) : asistencias.length === 0 ? (
        <p style={{ textAlign: "center" }}>No hay registros para esta semana.</p>
      ) : (
        <div className={`${styles['tabla-scroll']} ${styles['sin-scroll']}`}>
          <table className={styles['tabla-asistencia']}>
            <thead>
              <tr>
                <th className={styles['columna-fija']}>Nombre</th>
                {diasSemana.map((dia, indice) => (
                  <th
                    key={dia}
                    onClick={() => manejarClick(indice)}
                    className={columnaSeleccionada === indice ? styles['columna-activa'] : ""}
                  >
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(empleadosAgrupados).map(([nombre, diasObj]) => (
                <tr key={nombre}>
                  <td className={`${styles['nombre-empleado']} ${styles['columna-fija']}`}>{nombre}</td>
                  {diasSemana.map((_, indice) => {
                    const diaFecha = new Date(lunes);
                    diaFecha.setDate(lunes.getDate() + indice);
                    const diaStr = formatearFecha(diaFecha);
                    const info = diasObj[diaStr] || {};
                    return (
                      <td
                        key={indice}
                        className={`${styles['celda-dia']} ${columnaSeleccionada === indice ? styles['columna-activa'] : ""}`}
                        onClick={() => manejarClick(indice)}
                      >
                        {renderizarIconos(info)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mostrarModal && fechaSeleccionada && (
        <VistaDetallada fecha={fechaSeleccionada} onClose={cerrarModal} onGuardar={handleGuardar} />
      )}
    </div>
  );
};

export default Asistencia;