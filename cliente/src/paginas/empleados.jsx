import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../style/empleado.css";

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
    setSeleccionado((prev) => (prev === id ? null : id)); // alterna selección única
  };

  return (
    <div className="empleado-registro">
      <h2 className="titulo">REGISTRO DE EMPLEADOS</h2>

      <div className="botones-acciones">
        <Link to="/aniadir_empleado">
          <button className="btn verde">Añadir</button>
        </Link>

        {seleccionado && (
          <>
            <Link to="/aniadir_empleado">
              <button className="btn gris">Editar</button>
            </Link>
            <button
              className="btn rojo"
              onClick={() => eliminarEmpleado(seleccionado)}
            >
              Eliminar
            </button>
          </>
        )}

        {!seleccionado && (
          <>
            <button className="btn gris" disabled>
              Editar
            </button>
            <button className="btn rojo" disabled>
              Eliminar
            </button>
          </>
        )}
      </div>

      <div className="lista-empleados">
        {empleados.map((e) => (
          <div
            key={e.ID}
            className={`tarjeta-empleado ${
              seleccionado === e.ID ? "seleccionada" : ""
            }`}
            onClick={() => handleSeleccion(e.ID)}
          >
            <div className="columna-id">
              <span className="id-text">{e.ID}</span>
              <span
                className={`id-circulo ${
                  seleccionado === e.ID ? "activo" : ""
                }`}
              ></span>
            </div>

            <div className="contenido-empleado">
              <p className="tit">
                <strong>Nombre:</strong> {e.Nombre}
              </p>
              <p className="tit2">
                <strong>Cargo:</strong> {e.Cargo}
              </p>
              <p className="tit2">
                <strong>Celular:</strong> {e.Celular}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Empleados;
