// InformeMenu.jsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import InformeAutos from './Autos-Lavados/informe_autosLavados';
import InformeAsistencias from './asistencias/informe_asistencias';
import InformeInventario from './inventario/informe_inventario';
import calendario from '../../assets/informe/calendario.png'
import './informeMenu.css';

export default function InformeMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mostrarMenu, setMostrarMenu] = useState(false);

  // Leer módulo y agrupación de la URL, con valores por defecto
  const moduloActivo = searchParams.get('modulo') || 'autos';
  const agrupacion = searchParams.get('agrupacion') || 'mes';

  const cambiarModulo = (nuevoModulo) => {
    setSearchParams({ modulo: nuevoModulo, agrupacion });
  };

  const cambiarAgrupacion = (nuevaAgrupacion) => {
    setSearchParams({ modulo: moduloActivo, agrupacion: nuevaAgrupacion });
    setMostrarMenu(false);
  };

  const renderModulo = () => {
    switch (moduloActivo) {
      case 'autos':
        return <InformeAutos agrupacion={agrupacion} />;
      case 'asistencias':
        return <InformeAsistencias agrupacion={agrupacion} />;
      case 'inventario':
        return <InformeInventario agrupacion={agrupacion} />;
      default:
        return null;
    }
  };

  const toggleMenu = () => {
    setMostrarMenu(!mostrarMenu);
  };

  return (
    <div className="informe-container">
      <div className="informe-wrapper">
        <h1 className="informe-title">Informes</h1>

        {/* Botones de navegación */}
        <div className="nav-buttons">
          <button
            onClick={() => cambiarModulo('inventario')}
            className={`nav-button ${moduloActivo === 'inventario' ? 'active' : ''}`}
          >
            Inventario
          </button>
          <button
            onClick={() => cambiarModulo('asistencias')}
            className={`nav-button ${moduloActivo === 'asistencias' ? 'active' : ''}`}
          >
            Asistencias
          </button>
          <button
            onClick={() => cambiarModulo('autos')}
            className={`nav-button ${moduloActivo === 'autos' ? 'active' : ''}`}
          >
            Autos
          </button>
        </div>

        {/* Header del módulo con botón de calendario */}
        <div className="module-header">
          <h2 className="module-title">
            {moduloActivo === 'autos' ? 'Autos' : moduloActivo === 'asistencias' ? 'Asistencias' : 'Inventario'}
          </h2>
          
          <div className="calendar-menu-container">
            <button 
              className="calendar-button"
              onClick={toggleMenu}
            >
              {/* PON AQUÍ TU ÍCONO DE CALENDARIO */}
              <span className="calendar-icon"><img src={calendario}/></span>
            </button>

            {mostrarMenu && (
              <div className="dropdown-menu">
                <button
                  className={`dropdown-item ${agrupacion === 'semana' ? 'active' : ''}`}
                  onClick={() => cambiarAgrupacion('semana')}
                >
                  Semana
                </button>
                <button
                  className={`dropdown-item ${agrupacion === 'mes' ? 'active' : ''}`}
                  onClick={() => cambiarAgrupacion('mes')}
                >
                  Mes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Renderiza el componente correspondiente */}
        {renderModulo()}
      </div>
    </div>
  );
}
