import axios from "axios";
import { useEffect, useState } from "react";

function VistaDetallada({ fecha, onClose, onGuardar }) {
  const [empleados, setEmpleados] = useState([]);
  const [datosAsistencia, setDatosAsistencia] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const obtenerNombreDia = (fechaStr) => {
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const fecha = new Date(fechaStr + 'T00:00:00');
    return diasSemana[fecha.getDay()];
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const cargarDatos = async () => {
      setLoading(true);
      setError(null);

      try {
        const resEmpleados = await axios.get("/api/empleados", { signal });
        const listaEmpleados = resEmpleados.data.data || [];
        setEmpleados(listaEmpleados);

        try {
          const resAsistencias = await axios.get(`/api/asistencias/semana?fecha=${fecha}`, { signal });
          const asistencias = resAsistencias.data.data || [];
          
          const fechaNormalizada = new Date(fecha).toISOString().split('T')[0];
          const asistenciasDia = asistencias.filter(a => {
            const fechaAsistencia = new Date(a.fecha).toISOString().split('T')[0];
            return fechaAsistencia === fechaNormalizada;
          });
          
          const asistenciasMap = {};
          listaEmpleados.forEach(empleado => {
            const asistencia = asistenciasDia.find(a => a.empleado_id === empleado.ID);
            if (asistencia) {
              asistenciasMap[empleado.ID] = {
                asistenciaId: asistencia.asistencia_id || null,
                pagadoId: asistencia.pagado_id || null,
                valeId: asistencia.vale_id || null,
                estado: asistencia.estado || "",
                pagado: asistencia.pagado || false,
                vale: asistencia.vale || 0
              };
            }
          });
          
          setDatosAsistencia(asistenciasMap);
        } catch (errAsistencias) {
          console.log("No hay asistencias previas para esta fecha");
          setDatosAsistencia({});
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Fetch cancelado");
        } else {
          console.error("Error al cargar datos:", err);
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
    return () => controller.abort();
  }, [fecha]);

  const handleInputChange = (empleadoId, campo, valor) => {
    setDatosAsistencia(prev => ({
      ...prev,
      [empleadoId]: {
        ...prev[empleadoId],
        [campo]: valor
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const promesas = empleados.map(async (empleado) => {
        const datos = datosAsistencia[empleado.ID];
        
        const tieneRegistrosPrevios = datos && (datos.asistenciaId || datos.pagadoId || datos.valeId);
        
        if (!datos && !tieneRegistrosPrevios) {
          return null;
        }

        const payload = {
          empleadoId: empleado.ID,
          fecha: fecha,
          estado: datos?.estado || null,
          pagado: datos?.pagado || false,
          vale: datos?.vale || 0,
          asistenciaId: datos?.asistenciaId || null,
          pagadoId: datos?.pagadoId || null,
          valeId: datos?.valeId || null
        };

        if (tieneRegistrosPrevios) {
          return axios.put("/api/asistencias/actualizar", payload);
        } else {
          if (datos?.estado || datos?.vale > 0 || datos?.pagado) {
            return axios.post("/api/asistencias/crear", payload);
          }
          return null;
        }
      });

      await Promise.all(promesas.filter(p => p !== null));
      
      setMensaje("Datos guardados correctamente");
      
      setTimeout(() => {
        onGuardar();
      }, 1000);
      
    } catch (error) {
      console.error("Error al guardar datos:", error);
      setMensaje("Error al guardar datos");
    }
  };

  if (loading) return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <p>Cargando empleados...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <p>Error: {error.message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <h2>
          {obtenerNombreDia(fecha)}
          <span className="fecha-pequeña"> {fecha}</span>
        </h2>
        
        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Vale ($)</th>
                <th>Pagado</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado) => {
                const datos = datosAsistencia[empleado.ID] || {};
                
                return (
                  <tr key={empleado.ID}>
                    <td>{empleado.Nombre}</td>
                    <td>
                      <select
                        value={datos.estado || ""}
                        onChange={(e) => handleInputChange(empleado.ID, 'estado', e.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Presente">Presente</option>
                        <option value="Ausente">Ausente</option>
                        <option value="Tarde">Tarde</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={datos.vale || ""}
                        onChange={(e) => handleInputChange(empleado.ID, 'vale', parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={datos.pagado || false}
                        onChange={(e) => handleInputChange(empleado.ID, 'pagado', e.target.checked)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="modal-acciones">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>
    </div>
  );
}

export default VistaDetallada;