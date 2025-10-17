import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import "../style/ventanaA.css";

const AsistenciaMovil = () => {
  const empleados = ["Nombre Apellido", "Nombre Apellido", "Nombre Apellido", "Nombre Apellido"];

  const [asistencia, setAsistencia] = useState(
    empleados.map(() => ({ asistio: false, pago: "", vale: "" }))
  );

  const toggleAsistencia = (index) => {
    const nueva = [...asistencia];
    nueva[index].asistio = !nueva[index].asistio;
    setAsistencia(nueva);
  };

  const handleChange = (index, campo, valor) => {
    const nueva = [...asistencia];
    nueva[index][campo] = valor;
    setAsistencia(nueva);
  };

  return (
    <div className="contenedor-asistencia-m">
      <div className="header-asistencia-m">
        <div className="titulo-asistencia">
          <ArrowLeft size={20} />
          <h1>Lunes</h1>
        </div>
        <button className="btn-confirmar">Confirmar</button>
      </div>

      <div className="tabla-asistencia-m">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Asis.</th>
              <th>Pago diario</th>
              <th>Vale</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((nombre, i) => (
              <tr key={i}>
                <td>{nombre}</td>
                <td>
                  <div
                    className={`cuadro-asis ${asistencia[i].asistio ? "activo" : ""}`}
                    onClick={() => toggleAsistencia(i)}
                  ></div>
                </td>
                <td>
                  <input
                    type="text"
                    value={asistencia[i].pago}
                    onChange={(e) => handleChange(i, "pago", e.target.value)}
                    className="input-asistencia"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={asistencia[i].vale}
                    onChange={(e) => handleChange(i, "vale", e.target.value)}
                    className="input-asistencia"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsistenciaMovil;
