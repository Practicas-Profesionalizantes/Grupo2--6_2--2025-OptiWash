import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/registro_autos.css";
import { Link } from "react-router-dom";


function RegistroAuto() {
  const [registros, setRegistros] = useState([]);
  const [expandido, setExpandido] = useState({});

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    try {
      const res = await axios.get("/api/registros");
      setRegistros(res.data);
    } catch (e) {
      console.error("Error al obtener registros", e);
    }
  };

  const toggleExpandir = (id) => {
    setExpandido((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="registro-container">
      <div className="acciones">
        <Link to="/editar" style={{ textDecoration: "none" }}>
          <button className="btn editar">Editar</button>
        </Link>
        <Link to="/editar" style={{ textDecoration: "none" }}>
          <button className="btn anadir">Añadir</button>
        </Link>
      </div>

      <div className="lista-registros">
        {registros.map((r, index) => (
          <div className="tarjeta-registro" key={r.ID}>
            <div className="columna-id">{registros.length - index}</div>

            <div className="contenido">
              <div className="encabezado">
                <span className="modelo">Modelo: {r.Modelo}</span>
                <span className="precio">Precio: {r.Precio.toLocaleString()}</span>
                <button
                  className="toggle"
                  onClick={() => toggleExpandir(r.ID)}
                >
                  {expandido[r.ID] ? "−" : "+"}
                </button>
              </div>

              {expandido[r.ID] && (
                <div className="detalles">
                    <div className="fila-datos">
                    <span className="nombre"><strong>{r.Cliente || "Sin Nombre"}</strong></span>
                    <span className="separador">|</span>
                    <span className="patente">{r.Patente || "Sin Patente"}</span>
                    <span className="separador">|</span>
                    <span className="telefono">{r.Telefono ? `+${r.Telefono}` : "Sin N° celular"}</span>
                </div>
  <p className="nota">Nota: {r.Nota || "----"}</p>
</div>

              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegistroAuto;
