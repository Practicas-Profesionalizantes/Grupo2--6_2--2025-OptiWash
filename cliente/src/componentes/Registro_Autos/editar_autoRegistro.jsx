// EditarAutoRegistro.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./añadir_autosRegistro.module.css";

export default function EditarAutoRegistro({ registro, onClose }) {
  const [form, setForm] = useState({
    cliente: "",
    modelo: "",
    patente: "",
    telefono: "",
    id_servicio: "",
    precio: "",
    nota: "",
  });

  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const res = await axios.get("/api/servicios");
        setServicios(res.data);
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      }
    };
    cargarServicios();
  }, []);

  // Precargar datos del registro seleccionado
  useEffect(() => {
    if (registro) {
      setForm({
        cliente: registro.Cliente || "",
        modelo: registro.Modelo || "",
        patente: registro.Patente || "",
        telefono: registro.Telefono || "",
        id_servicio: registro.ID_Servicio || "",
        precio: registro.Precio || "",
        nota: registro.nota || "",
      });
    }
  }, [registro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id_servicio") {
      const servicioSeleccionado = servicios.find(
        (s) => s.ID === parseInt(value)
      );
      setForm({
        ...form,
        [name]: value,
        precio: servicioSeleccionado ? servicioSeleccionado.Precio : "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        cliente: form.cliente,
        modelo: form.modelo,
        patente: form.patente,
        telefono: form.telefono,
        id_servicio: form.id_servicio || 1,
        precio: form.precio,
        nota: form.nota,
      };

      await axios.put(`/api/registros/${registro.ID}`, dataToSend);

      onClose(true); // ✅ Cerrar y recargar lista
    } catch (error) {
      console.error("Error al editar registro:", error);
      alert("❌ Error al editar registro");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles["ventana-form"]}>
        <h2>Editar Registro</h2>

        <form onSubmit={handleSubmit}>
          <label>Nombre del Cliente</label>
          <input
            type="text"
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            required
          />

          <label>Modelo del Vehículo</label>
          <input
            type="text"
            name="modelo"
            value={form.modelo}
            onChange={handleChange}
            required
          />

          <label>Patente</label>
          <input
            type="text"
            name="patente"
            value={form.patente}
            onChange={handleChange}
            required
          />

          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
          />

          <label>Servicio</label>
          <select
            name="id_servicio"
            value={form.id_servicio}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un servicio</option>
            {servicios.map((servicio) => (
              <option key={servicio.ID} value={servicio.ID}>
                {servicio.Tipo_Servicio}
              </option>
            ))}
          </select>

          <label>Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />

          <label>Nota (Opcional)</label>
          <textarea
            name="nota"
            value={form.nota}
            onChange={handleChange}
            rows="3"
          />

          <div className={styles.botones}>
            <button
              type="button"
              className={styles.cancelar}
              onClick={() => onClose(false)}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.confirmar}>
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}