import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/registro_autos.css";

function Registro_auto() {
  const [registros, setRegistros] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(null);

  const [nuevoRegistro, setNuevoRegistro] = useState({
    cliente: "",
    modelo: "",
    patente: "",
    telefono: "",
    id_servicio: "",
  });

  // ==========================
  // Cargar datos iniciales
  // ==========================
  useEffect(() => {
    cargarRegistros();
    cargarServicios();
  }, []);

  const cargarServicios = async () => {
    try {
      const res = await axios.get("/api/servicios");
      setServicios(res.data || []);
    } catch (e) {
      console.error("Error al cargar servicios", e);
    }
  };

  const cargarRegistros = async () => {
    try {
      const res = await axios.get("/api/registros");
      setRegistros(res.data || []);
    } catch (e) {
      console.error("Error al cargar registros", e);
    }
  };

  // ==========================
  // Helpers de formulario
  // ==========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoRegistro((prev) => ({
      ...prev,
      [name]: name === "id_servicio" ? Number(value) : value, // fuerza número en servicio
    }));
  };

  const limpiarFormulario = () => {
    setNuevoRegistro({
      cliente: "",
      modelo: "",
      patente: "",
      telefono: "",
      id_servicio: "",
    });
  };

  // ==========================
  // CRUD
  // ==========================
  const agregarRegistro = async () => {
    try {
      await axios.post("/api/registros", nuevoRegistro);
      cargarRegistros();
      limpiarFormulario();
    } catch (e) {
      console.error("Error al agregar registro", e);
    }
  };

  const editarRegistro = (id) => {
    const registro = registros.find((r) => r.ID === id);
    if (!registro) return;
    setNuevoRegistro({
      cliente: registro.Cliente || "",
      modelo: registro.Modelo || "",
      patente: registro.Patente || "",
      telefono: registro.Telefono || "",
      id_servicio: registro.ID_Servicio || "",
    });
    setModoEdicion(id);
  };

  const guardarEdicion = async () => {
    try {
      await axios.put(`/api/registros/${modoEdicion}`, nuevoRegistro);
      cargarRegistros();
      setModoEdicion(null);
      limpiarFormulario();
    } catch (e) {
      console.error("Error al actualizar registro", e);
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      await axios.delete(`/api/registros/${id}`);
      if (modoEdicion === id) {
        setModoEdicion(null);
        limpiarFormulario();
      }
      cargarRegistros();
    } catch (e) {
      console.error("Error al eliminar registro", e);
    }
  };

  // ==========================
  // Render
  // ==========================
  return (
    <div className="registro-container">
      <h2>Registro de Autos Lavados</h2>

      <div className="formulario">
        <input
          type="text"
          name="cliente"
          placeholder="Cliente"
          value={nuevoRegistro.cliente}
          onChange={handleChange}
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={nuevoRegistro.modelo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="patente"
          placeholder="Patente"
          value={nuevoRegistro.patente}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={nuevoRegistro.telefono}
          onChange={handleChange}
        />
        <select
          name="id_servicio"
          value={nuevoRegistro.id_servicio}
          onChange={handleChange}
        >
          <option value="">Seleccionar servicio</option>
          {servicios.map((s) => (
            <option key={s.ID} value={s.ID}>
              {s.Tipo_Servicio}
            </option>
          ))}
        </select>

        {modoEdicion ? (
          <button onClick={guardarEdicion} className="btn guardar">
            Guardar
          </button>
        ) : (
          <button onClick={agregarRegistro} className="btn anadir">
            Añadir
          </button>
        )}
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Modelo</th>
            <th>Patente</th>
            <th>Teléfono</th>
            <th>Servicio</th>
            <th>Precio</th>
            <th className="col-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr key={r.ID}>
              <td>{r.Cliente}</td>
              <td>{r.Modelo}</td>
              <td>{r.Patente}</td>
              <td>{r.Telefono}</td>
              <td>{r.Tipo_Servicio}</td>
              <td>${r.Precio}</td>
              <td>
                <div className="acciones">
                  <button
                    className="btn editar"
                    onClick={() => editarRegistro(r.ID)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn eliminar"
                    onClick={() => eliminarRegistro(r.ID)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {registros.length === 0 && (
            <tr>
              <td colSpan="7" className="sin-datos">
                No hay registros cargados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Registro_auto;
