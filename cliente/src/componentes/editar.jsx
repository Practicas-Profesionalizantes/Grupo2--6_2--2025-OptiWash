import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/editar.css";
import { Link } from "react-router-dom";


function RegistroForm({ modo, registroActual, onCerrar, onGuardar }) {
  const [form, setForm] = useState({
    cliente: "",
    patente: "",
    modelo: "",
    precio: "",
    telefono: "",
  });

  useEffect(() => {
    if (registroActual) {
      setForm({
        cliente: registroActual.Cliente || "",
        patente: registroActual.Patente || "",
        modelo: registroActual.Modelo || "",
        precio: registroActual.Precio || "",
        telefono: registroActual.Telefono || "",
      });
    }
  }, [registroActual]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (modo === "editar") {
        await axios.put(`/api/registros/${registroActual.ID}`, form);
      } else {
        await axios.post("/api/registros", form);
      }
      onGuardar(); 
      onCerrar();  
    } catch (err) {
      console.error("Error al guardar registro:", err);
    }
  };

  return (
    <div className="overlay">
      <div className="ventana-form">
        <h2>{modo === "editar" ? "Editar" : "Añadir"}</h2>

        <label>Nombre</label>
        <input
          type="text"
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
        />

        <label>Patente</label>
        <input
          type="text"
          name="patente"
          value={form.patente}
          onChange={handleChange}
        />

        <label>Modelo</label>
        <input
          type="text"
          name="modelo"
          value={form.modelo}
          onChange={handleChange}
        />

        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
        />

        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
        />

        <div className="botones">
          <Link to="/registro_autos" style={{ textDecoration: "none" }}>
            <button className="cancelar" onClick={onCerrar}>Cancelar</button>
          </Link>
          <Link to="/registro_autos" style={{ textDecoration: "none" }}>
            <button className="confirmar" onClick={handleSubmit}>Confirmar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegistroForm;
