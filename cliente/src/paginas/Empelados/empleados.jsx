import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./empleado.module.css";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const res = await axios.get("/api/empleado");
      setEmpleados(res.data.data);
    } catch (e) {
      console.error("Error al cargar empleados:", e);
    }
  };

  const eliminarEmpleado = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este empleado?")) return;
    try {
      await axios.delete(`/api/empleado/${id}`);
      cargarEmpleados();
    } catch (e) {
      console.error("Error al eliminar empleado:", e);
    }
  };

  return (
    <div className={styles['empleado-registro']}>
      <h2 className={styles.titulo}>REGISTRO DE EMPLEADOS</h2>

      <div className={styles['botones-acciones']}>
        <button className={`${styles.btn} ${styles.verde}`}>Añadir</button>
        <button className={`${styles.btn} ${styles.gris}`}>Editar</button>
        <button className={`${styles.btn} ${styles.rojo}`}>Eliminar</button>
      </div>

      <div className={styles['lista-empleados']}>
        {empleados.map((e) => (
          <div key={e.ID} className={styles['tarjeta-empleado']}>
            <p className={styles.tit}><strong>Nombre:</strong> {e.Nombre}</p>
            <p className={styles.tit2}><strong>Cargo:</strong> {e.Cargo}</p>
            <p className={styles.tit2}><strong>Celular:</strong> {e.celular}</p>
            <button
              className={styles['btn-eliminar']}
              onClick={() => eliminarEmpleado(e.ID)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Empleados;
