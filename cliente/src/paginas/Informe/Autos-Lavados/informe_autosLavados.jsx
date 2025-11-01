
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InformeAutos({ agrupacion }) {
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    cargarInformes();
  }, [agrupacion]);

  const cargarInformes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/informes/autos/${agrupacion}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setInformes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar informes de autos:', error);
      setInformes([]);
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    });
  };

  const formatearRangoFecha = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    
    if (agrupacion === 'mes') {
      
      return inicio.toLocaleDateString('es-AR', {
        month: 'long',
        year: 'numeric'
      });
    } else {
      
      const inicioStr = inicio.toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'numeric'
      });
      const finStr = fin.toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      });
      return `${inicioStr} - ${finStr}`;
    }
  };

  const handleVerDetalle = (informe) => {
    
    navigate(`/informes/autos/detalle?fecha_inicio=${informe.fecha_inicio}&fecha_fin=${informe.fecha_fin}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (informes.length === 0) {
    return (
      <div className="empty-state">
        No hay informes de autos disponibles
      </div>
    );
  }

  return (
    <div className="informes-list">
      {informes.map((informe, index) => (
        <div 
          key={index}
          className="informe-card"
          onClick={() => handleVerDetalle(informe)}
        >
          <span className="informe-fecha">
            {formatearRangoFecha(informe.fecha_inicio, informe.fecha_fin)}
          </span>
          <span className="informe-dato">
            {informe.total_lavados} {informe.total_lavados === 1 ? 'lavado' : 'lavados'}
          </span>
        </div>
      ))}
    </div>
  );
}