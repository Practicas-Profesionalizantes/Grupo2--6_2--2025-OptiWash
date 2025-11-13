import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/aniadir_empleado.jsx.css";

function Aniadir_empleado() {
  const [form, setForm] = useState({
    Nombre: "",
    Apellido: "",
    Cargo: "",
    celular: "",
  });

  const navigate = useNavigate();

  // ✅ Falta esta función en tu código original
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Fusionar Nombre + Apellido antes de enviarlo
    const nombreCompleto = `${form.Nombre.trim()} ${form.Apellido.trim()}`;

    try {
      await axios.post("/api/empleado", {
        Nombre: nombreCompleto,
        Cargo: form.Cargo,
        celular: form.celular,
      });
      navigate("/empleados");
    } catch (error) {
      console.error("Error al crear empleado:", error);
    }
  };

  return (
    <div className="contenedor-empleado">
      <div className="icono">
        <i className="fa-solid fa-user"></i>
      </div>
      <h2 className="titulo-empleado">Añadir Empleado</h2>

      <form className="form-empleado" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
          required
        />

        <label>Apellido</label>
        <input
          type="text"
          name="Apellido"
          value={form.Apellido}
          onChange={handleChange}
          required
        />

        <label>Celular</label>
        <input
          type="text"
          name="celular"
          value={form.celular}
          onChange={handleChange}
          required
        />

        <label>Cargo</label>
        <input
          type="text"
          name="Cargo"
          value={form.Cargo}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-crear">
          <i className="fa-solid fa-plus"></i> Crear
        </button>
      </form>
    </div>
  );
}

export default Aniadir_empleado;
