import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./vistaDetallada.module.css";
import volver from "../../assets/asistencia/volver.png";

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
        const resEmpleados = await axios.get("/api/empleado", { signal });
        const listaEmpleados = resEmpleados.data || [];
        setEmpleados(listaEmpleados);
        console.log("Empleados cargados:", empleados);

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
    if (e) e.preventDefault();
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
    <div className={styles['vista-detallada-modal']}>
      <div className={styles['vista-detallada-contenido']}>
        <p>Cargando empleados...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className={styles['vista-detallada-modal']}>
      <div className={styles['vista-detallada-contenido']}>
        <p>Error: {error.message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );

  return (
    <div className={styles['vista-detallada-modal']} onClick={onClose}>
      <div className={styles['vista-detallada-contenido']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['header-row']}>
          <div
            className={styles['btn-volver']}
            onClick={onClose}
            style={{ backgroundImage: `url(${volver})` }}
          />
          <h2>
            {obtenerNombreDia(fecha)} <span className={styles['fecha-inline']}>{fecha}</span>
          </h2>
          <button
            className={styles['btn-confirmar-header']}
            onClick={handleSubmit}
            type="button"
          >
            Confirmar
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Asis.</th>
                <th>P.D.</th>
                <th>Vale</th>
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
                        <option value="">-</option>
                        <option value="Presente">Presente</option>
                        <option value="Ausente">Ausente</option>
                        <option value="Tarde">Tarde</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={datos.pagado || false}
                        onChange={(e) => handleInputChange(empleado.ID, 'pagado', e.target.checked)}
                      />
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>

        {mensaje && <div className={styles['mensaje-flotante']}>{mensaje}</div>}
      </div>
    </div>
  );
}

export default VistaDetallada;