import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/empleado.css";

function Empleados() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      const res = await axios.get("/api/empleado");
      setEmpleados(res.data);
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
    <div className="empleado-registro">
      <h2 className="titulo">REGISTRO DE EMPLEADOS</h2>

      <div className="botones-acciones">
        <button className="btn verde">Añadir</button>
        <button className="btn gris">Editar</button>
        <button className="btn rojo">Eliminar</button>
      </div>

      <div className="lista-empleados">
        {empleados.map((e) => (
          <div key={e.ID} className="tarjeta-empleado">
            <p className="tit"><strong>Nombre:</strong> {e.Nombre}</p>
            <p className="tit2"><strong>Cargo:</strong> {e.Cargo}</p>
            <p className="tit2"><strong>Celular:</strong> {e.celular}</p>
            <button
              className="btn-eliminar"
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
