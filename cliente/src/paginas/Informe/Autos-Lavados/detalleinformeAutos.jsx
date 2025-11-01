
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './DetalleInformeAutos.module.css';

export default function DetalleInformeAutos() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [lavados, setLavados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gananciaTotal, setGananciaTotal] = useState(0);

  const fechaInicio = searchParams.get('fecha_inicio');
  const fechaFin = searchParams.get('fecha_fin');

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      cargarDetalleLavados();
    }
  }, [fechaInicio, fechaFin]);

  const cargarDetalleLavados = async () => {
    setLoading(true);
    try {
      
      const inicio = fechaInicio.split('T')[0];
      const fin = fechaFin.split('T')[0];
      
      const url = `/api/informes/autos/detalle?fecha_inicio=${inicio}&fecha_fin=${fin}`;
      console.log('URL de petición:', url); 
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Datos recibidos:', data); 
      
      
      if (data.length > 0 && data[0].Nombre !== undefined) {
        setLavados(Array.isArray(data) ? data : []);
        
        
        const total = data.reduce((sum, lavado) => sum + parseFloat(lavado.Precio || 0), 0);
        setGananciaTotal(total);
      } else {
        console.error('Estructura de datos incorrecta:', data);
        setLavados([]);
        setGananciaTotal(0);
      }
    } catch (error) {
      console.error('Error al cargar detalle de lavados:', error);
      setLavados([]);
      setGananciaTotal(0);
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
    navigate('/informes?modulo=autos&agrupacion=mes');
  };

  return (
    <div className={styles['detalle-container']}>
      <div className={styles['detalle-wrapper']}>
        <h1 className={styles['detalle-title']}>Informe de autos</h1>
        <p className={styles['detalle-fecha']}>{fechaInicio ? formatearFecha(fechaInicio) : ''}</p>

        {loading ? (
          <div className={styles['loading-container']}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles['tabla-container']}>
              <table className={styles['tabla-lavados']}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Patente</th>
                    <th>Tipo de servicio</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {lavados.length === 0 ? (
                    <tr>
                      <td colSpan="4" className={styles['empty-cell']}>
                        No hay registros de lavados en este período
                      </td>
                    </tr>
                  ) : (
                    lavados.map((lavado, index) => (
                      <tr key={index}>
                        <td>{lavado.Nombre || '-'}</td>
                        <td>{lavado.Patente || '-'}</td>
                        <td>{lavado.Tipo_Servicio || '-'}</td>
                        <td>$ {parseFloat(lavado.Precio || 0).toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className={styles['ganancia-total']}>
              <h2>Ganancia Total: ${gananciaTotal.toFixed(2)}</h2>
            </div>

            <button className={styles['btn-volver']} onClick={handleVolver}>
              Volver
            </button>
          </>
        )}
      </div>
    </div>
  );
}