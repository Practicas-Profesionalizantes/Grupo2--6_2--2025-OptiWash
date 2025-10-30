// ModalMovimiento.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ModalMovimiento.css';

function ModalMovimiento({ tipo, productos, onClose, onExito }) {
  const [movimientos, setMovimientos] = useState({});
  const [precios, setPrecios] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const keyMovimientos = `inventario_${tipo}_movimientos`;
  const keyPrecios = `inventario_${tipo}_precios`;

  // Cargar última configuración guardada al montar el componente
  useEffect(() => {
    const guardadoMovimientos = localStorage.getItem(keyMovimientos);
    const guardadoPrecios = localStorage.getItem(keyPrecios);

    if (guardadoMovimientos) {
      setMovimientos(JSON.parse(guardadoMovimientos));
    }
    if (guardadoPrecios) {
      setPrecios(JSON.parse(guardadoPrecios));
    }
  }, []);

  // Guardar automáticamente cuando cambian los movimientos
  useEffect(() => {
    if (Object.keys(movimientos).length > 0) {
      localStorage.setItem(keyMovimientos, JSON.stringify(movimientos));
    }
  }, [movimientos, keyMovimientos]);

  // Guardar automáticamente cuando cambian los precios
  useEffect(() => {
    if (Object.keys(precios).length > 0) {
      localStorage.setItem(keyPrecios, JSON.stringify(precios));
    }
  }, [precios, keyPrecios]);

  const handleCantidadChange = (id, valor) => {
    setMovimientos(prev => ({ ...prev, [id]: valor }));
  };

  const handlePrecioChange = (id, valor) => {
    setPrecios(prev => ({ ...prev, [id]: valor }));
  };

  const cargarUltimaConfiguracion = () => {
    const guardadoMovimientos = localStorage.getItem(keyMovimientos);
    const guardadoPrecios = localStorage.getItem(keyPrecios);

    if (guardadoMovimientos) {
      setMovimientos(JSON.parse(guardadoMovimientos));
    }
    if (guardadoPrecios) {
      setPrecios(JSON.parse(guardadoPrecios));
    }

    if (guardadoMovimientos || guardadoPrecios) {
      setMensaje('✓ Última configuración cargada');
      setTimeout(() => setMensaje(''), 2000);
    } else {
      setMensaje('⚠ No hay configuración guardada');
      setTimeout(() => setMensaje(''), 2000);
    }
  };

  const confirmarMovimientos = async () => {
    setLoading(true);
    let huboCambios = false;

    try {
      for (const producto of productos) {
        const id = producto.ID;
        const cantidad = parseFloat(movimientos[id]);
        const precio = parseFloat(precios[id]);

        if (isNaN(cantidad) || cantidad <= 0) continue;

        const cantidadFinal = tipo === 'utilizar' ? -cantidad : cantidad;
        const precioFinal = !isNaN(precio) && precio > 0 ? precio : producto.precio_unitario;

        await axios.put(`/api/inventario/actualizar/${id}`, {
          cantidad: cantidadFinal,
          precio: precioFinal
        });

        huboCambios = true;
      }

      if (huboCambios) {
        setMensaje('✓ Inventario actualizado correctamente');
        setTimeout(() => {
          onExito();
        }, 1500);
      } else {
        setMensaje('No se realizaron cambios');
        setLoading(false);
      }
    } catch (error) {
      setMensaje('Error al actualizar inventario');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {tipo === 'agregar' ? 'Agregar Productos' : 'Registrar Uso'}
          </h2>
          <button className="btn-cerrar" onClick={onClose}>×</button>
        </div>

        {mensaje && (
          <div className={`mensaje ${mensaje.includes('✓') ? 'exito' : mensaje.includes('⚠') ? 'warning' : 'error'}`}>
            {mensaje}
          </div>
        )}

        <div className="acciones-config">
          <button className="btn-cargar-config" onClick={cargarUltimaConfiguracion}>
            Cargar última configuración
          </button>
          <span className="texto-auto-guardado">Se guarda automáticamente</span>
        </div>

        <div className="modal-body">
          <table className="tabla-modal">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Stock Actual</th>
                <th>Cantidad (Bidones)</th>
                {tipo === 'agregar' && <th>Precio ($/Bidón)</th>}
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.ID}>
                  <td className="td-producto">{p.Nombre}</td>
                  <td className="td-stock">{p.Bidon} Bidones</td>
                  <td>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      step="1"
                      max={tipo === 'utilizar' ? p.Bidon : undefined}
                      value={movimientos[p.ID] || ''}
                      onChange={e => handleCantidadChange(p.ID, e.target.value)}
                      className="input-cantidad"
                    />
                  </td>
                  {tipo === 'agregar' && (
                    <td>
                      <input
                        type="number"
                        placeholder={p.precio_unitario}
                        min="0"
                        step="0.01"
                        value={precios[p.ID] || ''}
                        onChange={e => handlePrecioChange(p.ID, e.target.value)}
                        className="input-precio"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-footer">
          <button className="btn-cancelar" onClick={onClose} disabled={loading}>
            Cancelar
          </button>
          <button 
            className="btn-confirmar" 
            onClick={confirmarMovimientos}
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMovimiento;