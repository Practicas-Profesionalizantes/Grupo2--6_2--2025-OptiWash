import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./aniadir_empleado.module.css"; 
import user from "../../assets/emplado/user.png";

// ✅ usando module.css

function Añadir_empleado() {
  const navigate = useNavigate();
  const location = useLocation();

  const empleadoEdit = location.state?.empleado || null;

  const [form, setForm] = useState({
    Nombre: "",
    Apellido: "",
    Cargo: "",
    celular: "",
  });

  useEffect(() => {
    if (empleadoEdit) {
      const partes = empleadoEdit.Nombre.split(" ");
      const nombre = partes[0];
      const apellido = partes.slice(1).join(" ");
      setForm({
        Nombre: nombre,
        Apellido: apellido,
        Cargo: empleadoEdit.Cargo,
        celular: empleadoEdit.celular || "",
      });
    }
  }, [empleadoEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombreCompleto = `${form.Nombre.trim()} ${form.Apellido.trim()}`;

    try {
      if (empleadoEdit) {
        await axios.put(`/api/empleado/${empleadoEdit.ID}`, {
          Nombre: nombreCompleto,
          Cargo: form.Cargo,
          celular: form.celular,
        });
      } else {
        
        await axios.post("/api/empleado", {
          Nombre: nombreCompleto,
          Cargo: form.Cargo,
          celular: form.celular,
        });
      }

      navigate("/empleados");
    } catch (error) {
      console.error("Error al guardar empleado:", error);
    }
  };

  return (
    <div className={styles.contenedorEmpleado}>
      <div className={styles.icono}>
        <img src={user} alt="logo" className={styles.logo} />
      </div>

      <h2 className={styles.tituloEmpleado}>
        {empleadoEdit ? "Editar Empleado" : "Añadir Empleado"}
      </h2>

      <form className={styles.formEmpleado} onSubmit={handleSubmit}>
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

        <button type="submit" className={styles.btnCrear}>
          <i className={`fa-solid ${empleadoEdit ? "fa-pen" : "fa-plus"}`}></i>{" "}
          {empleadoEdit ? "Guardar Cambios" : "+ Crear"}
        </button>
      </form>
    </div>
  );
}

export default Añadir_empleado;
