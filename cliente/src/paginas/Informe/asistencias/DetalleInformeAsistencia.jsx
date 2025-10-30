// DetalleInformeAsistencias.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './DetalleInformeAsistencias.css';

export default function DetalleInformeAsistencias() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [estadisticas, setEstadisticas] = useState([]);

  const fechaInicio = searchParams.get('fecha_inicio');
  const fechaFin = searchParams.get('fecha_fin');

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      cargarDetalleAsistencias();
    }
  }, [fechaInicio, fechaFin]);

  const cargarDetalleAsistencias = async () => {
    setLoading(true);
    try {
      const inicio = fechaInicio.split('T')[0];
      const fin = fechaFin.split('T')[0];
      
      const url = `/api/informes/asistencias/detalle?fecha_inicio=${inicio}&fecha_fin=${fin}`;
      console.log('URL de petición:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Datos recibidos:', data);
      
      if (data.length > 0 && data[0].Nombre !== undefined) {
        setAsistencias(Array.isArray(data) ? data : []);
        
        // Calcular estadísticas por empleado
        const stats = data.reduce((acc, asist) => {
          if (!acc[asist.ID_Empleado]) {
            acc[asist.ID_Empleado] = {
              nombre: asist.Nombre,
              presentes: 0,
              ausentes: 0,
              tardes: 0
            };
          }
          
          if (asist.estado === 'Presente') acc[asist.ID_Empleado].presentes++;
          if (asist.estado === 'Ausente') acc[asist.ID_Empleado].ausentes++;
          if (asist.estado === 'Tarde') acc[asist.ID_Empleado].tardes++;
          
          return acc;
        }, {});
        
        setEstadisticas(Object.values(stats));
      } else {
        setAsistencias([]);
        setEstadisticas([]);
      }
    } catch (error) {
      console.error('Error al cargar detalle de asistencias:', error);
      setAsistencias([]);
      setEstadisticas([]);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleVolver = () => {
    navigate('/informes?modulo=asistencias&agrupacion=mes');
  };

  const calcularTotal = (empleado) => {
    return empleado.presentes + empleado.ausentes + empleado.tardes;
  };

  const calcularPagado = (empleado) => {
    // Asumiendo que cada día presente vale 10000
    return empleado.presentes * 10000;
  };

  const generarDatosGrafico = (empleado) => {
    const total = calcularTotal(empleado);
    return [
      { name: 'Presente', value: empleado.presentes, porcentaje: (empleado.presentes / total) * 100 },
      { name: 'Ausente', value: empleado.ausentes, porcentaje: (empleado.ausentes / total) * 100 },
      { name: 'Tarde', value: empleado.tardes, porcentaje: (empleado.tardes / total) * 100 }
    ];
  };

  const COLORS = {
    Presente: '#4ade80',
    Ausente: '#f87171',
    Tarde: '#fbbf24'
  };

  return (
    <div className="detalle-asistencias-container">
      <div className="detalle-asistencias-wrapper">
        <h1 className="detalle-asistencias-title">Informe de asistencia</h1>
        <p className="detalle-asistencias-fecha">{fechaInicio ? formatearFecha(fechaInicio) : ''}</p>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* Resumen superior */}
            <div className="resumen-badges">
              <div className="badge badge-presente">
                <span className="badge-label">P.cant</span>
                <span className="badge-value">
                  {estadisticas.reduce((sum, e) => sum + e.presentes, 0)}
                </span>
              </div>
              <div className="badge badge-ausente">
                <span className="badge-label">A.cant</span>
                <span className="badge-value">
                  {estadisticas.reduce((sum, e) => sum + e.ausentes, 0)}
                </span>
              </div>
              <div className="badge badge-tarde">
                <span className="badge-label">T.cant</span>
                <span className="badge-value">
                  {estadisticas.reduce((sum, e) => sum + e.tardes, 0)}
                </span>
              </div>
            </div>

            {/* Lista de empleados */}
            <div className="empleados-list">
              {estadisticas.length === 0 ? (
                <div className="empty-state">
                  No hay registros de asistencias en este período
                </div>
              ) : (
                estadisticas.map((empleado, index) => (
                  <div key={index} className="empleado-card">
                    <h3 className="empleado-nombre">{empleado.nombre}</h3>
                    
                    <div className="empleado-content">
                      {/* Gráfico */}
                      <div className="grafico-container">
                        <ResponsiveContainer width="100%" height={120}>
                          <PieChart>
                            <Pie
                              data={generarDatosGrafico(empleado)}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={50}
                              dataKey="value"
                            >
                              {generarDatosGrafico(empleado).map((entry, i) => (
                                <Cell key={`cell-${i}`} fill={COLORS[entry.name]} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Información */}
                      <div className="empleado-info">
                        <div className="info-row">
                          <span className="info-label">P:{empleado.presentes}</span>
                          <span className="info-value">Vale total: {calcularPagado(empleado)}</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">A:{empleado.ausentes}</span>
                          <span className="info-value">Pagado hoy: sí</span>
                        </div>
                        <div className="info-row">
                          <span className="info-label">T:{empleado.tardes}</span>
                          <button className="btn-ver-mas">Ver mas</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button className="btn-volver" onClick={handleVolver}>
              Volver
            </button>
          </>
        )}
      </div>
    </div>
  );
}