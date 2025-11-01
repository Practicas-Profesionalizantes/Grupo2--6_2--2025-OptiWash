import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./empleado.module.css";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const res = await axios.get("/api/empleado");
      setEmpleados(res.data);
    } catch (err) {
      console.error("Error al cargar empleados", err);
    }
  };

  const eliminarEmpleado = async (id) => {
    if (!id) return;
    try {
      await axios.delete(`/api/empleado/${id}`);
      setEmpleados((prev) => prev.filter((e) => e.ID !== id));
      setSeleccionado(null);
    } catch (err) {
      console.error("Error al eliminar empleado", err);
    }
  };

  const handleSeleccion = (id) => {
    setSeleccionado((prev) => (prev === id ? null : id));
  };

  const editarEmpleado = () => {
    const empleado = empleados.find((e) => e.ID === seleccionado);
    if (empleado) {
      navigate("/aniadir_empleado", { state: { empleado } });
    }
  };

  return (
    <div className={styles.empleadoRegistro}>
      <h2 className={styles.titulo}>REGISTRO DE EMPLEADOS</h2>

      <div className={styles.botonesAcciones}>
        <Link to="/aniadir_empleado">
          <button className={`${styles.btn} ${styles.verde}`}>Añadir</button>
        </Link>

        {seleccionado ? (
          <>
            <button
              className={`${styles.btn} ${styles.gris}`}
              onClick={editarEmpleado}
            >
              Editar
            </button>
            <button
              className={`${styles.btn} ${styles.rojo}`}
              onClick={() => eliminarEmpleado(seleccionado)}
            >
              Eliminar
            </button>
          </>
        ) : (
          <>
            <button className={`${styles.btn} ${styles.gris}`} disabled>
              Editar
            </button>
            <button className={`${styles.btn} ${styles.rojo}`} disabled>
              Eliminar
            </button>
          </>
        )}
      </div>

      <div className={styles.listaEmpleados}>
        {empleados.map((e) => (
          <div
            key={e.ID}
            className={`${styles.tarjetaEmpleado} ${
              seleccionado === e.ID ? styles.seleccionada : ""
            }`}
            onClick={() => handleSeleccion(e.ID)}
          >
            <div className={styles.columnaId}>
              <span className={styles.idText}>{e.ID}</span>
              <span
                className={`${styles.idCirculo} ${
                  seleccionado === e.ID ? styles.activo : ""
                }`}
              ></span>
            </div>

            <div className={styles.contenidoEmpleado}>
              <p className={styles.tit}>
                <strong>Nombre:</strong> {e.Nombre}
              </p>
              <p className={styles.tit2}>
                <strong>Cargo:</strong> {e.Cargo}
              </p>
              <p className={styles.tit2}>
                <strong>Celular:</strong> {e.celular}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Empleados;
