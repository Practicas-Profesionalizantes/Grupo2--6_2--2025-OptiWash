import React, { useState } from "react";
import "../style/asistencia.css";

const Asistencia = () => {
  const empleados = [
    "Jaimito Chambi",
    "María Pérez",
    "Pedro López",
    "Ana Gómez",
    "Luis Torres",
    "Sofía Ramírez",
  ];

  const dias = ["L", "M", "X", "J", "V", "S"];

  // Estado: asistencias[empleado][dia] = true/false
  const [asistencias, setAsistencias] = useState(
    empleados.reduce((acc, emp) => {
      acc[emp] = dias.reduce((d, dia) => ({ ...d, [dia]: false }), {});
      return acc;
    }, {})
  );

  // Cambiar solo ese checkbox (empleado + día)
  const toggleAsistencia = (empleado, dia) => {
    setAsistencias((prev) => ({
      ...prev,
      [empleado]: {
        ...prev[empleado],
        [dia]: !prev[empleado][dia], // 👈 solo cambia ese cuadrado
      },
    }));
  };

  return (
    <div className="contenedor-asistencia">
      {/* Navegación de semanas */}
      <div className="navegacion">
        <button>←</button>
        <span>26/05 - 31/05</span>
        <button>→</button>
      </div>

      {/* Tabla de asistencias */}
      <table className="tabla-asistencia">
        <thead>
          <tr>
            <th>Nombre</th>
            {dias.map((dia) => (
              <th key={dia}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp}>
              <td>{emp}</td>
              {dias.map((dia) => (
                <td key={dia} className="celda-check">
                  <input
                    type="checkbox"
                    checked={asistencias[emp][dia]}
                    onChange={() => toggleAsistencia(emp, dia)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Asistencia;
