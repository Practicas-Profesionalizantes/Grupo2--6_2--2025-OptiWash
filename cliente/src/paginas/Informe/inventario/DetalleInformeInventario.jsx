// DetalleInformeInventario.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './DetalleInformeInventario.module.css';

export default function DetalleInformeInventario() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalFinal, setTotalFinal] = useState(0);
  const [tipoVista, setTipoVista] = useState('gastos'); // 'gastos' o 'inversion'

  const fechaInicio = searchParams.get('fecha_inicio');
  const fechaFin = searchParams.get('fecha_fin');

  useEffect(() => {
    if (fechaInicio && fechaFin) {
      cargarDetalleInventario();
    }
  }, [fechaInicio, fechaFin, tipoVista]);

  const cargarDetalleInventario = async () => {
    setLoading(true);
    try {
      const inicio = fechaInicio.split('T')[0];
      const fin = fechaFin.split('T')[0];
      
      const url = `/api/informes/inventario/detalle?fecha_inicio=${inicio}&fecha_fin=${fin}&tipo=${tipoVista}`;
      console.log('URL de petición:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Datos recibidos:', data);
      
      if (data.length > 0 && data[0].Nombre !== undefined) {
        setProductos(Array.isArray(data) ? data : []);
        
        // Calcular total final
        const total = data.reduce((sum, prod) => {
          const totalProducto = prod.total_movimiento * parseFloat(prod.precio_unitario || 0);
          return sum + totalProducto;
        }, 0);
        setTotalFinal(total);
      } else {
        setProductos([]);
        setTotalFinal(0);
      }
    } catch (error) {
      console.error('Error al cargar detalle de inventario:', error);
      setProductos([]);
      setTotalFinal(0);
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
    navigate('/informes?modulo=inventario&agrupacion=mes');
  };

  const calcularTotal = (producto) => {
    return producto.total_movimiento * parseFloat(producto.precio_unitario || 0);
  };

  return (
    <div className={styles['detalle-inventario-container']}>
      <div className={styles['detalle-inventario-wrapper']}>
        <h1 className={styles['detalle-inventario-title']}>Informe de inventario</h1>
        <p className={styles['detalle-inventario-fecha']}>{fechaInicio ? formatearFecha(fechaInicio) : ''}</p>

        {/* Tabs para cambiar entre Gastos e Inversión */}
        <div className={styles['tabs-container']}>
          <button
            className={`${styles.tab} ${tipoVista === 'gastos' ? styles.active : ''}`}
            onClick={() => setTipoVista('gastos')}
          >
            Gastos
          </button>
          <button
            className={`${styles.tab} ${tipoVista === 'inversion' ? styles.active : ''}`}
            onClick={() => setTipoVista('inversion')}
          >
            Inversión
          </button>
        </div>

        {loading ? (
          <div className={styles['loading-container']}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <>
            <div className={styles['tabla-inventario-container']}>
              <table className={styles['tabla-inventario']}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Unidades</th>
                    <th>{tipoVista === 'gastos' ? 'Gasto Individual' : 'Precio Compra'}</th>
                    <th>{tipoVista === 'gastos' ? 'Gasto Total' : 'Inversión Total'}</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.length === 0 ? (
                    <tr>
                      <td colSpan="4" className={styles['empty-cell']}>
                        No hay {tipoVista === 'gastos' ? 'gastos' : 'inversiones'} en este período
                      </td>
                    </tr>
                  ) : (
                    productos.map((producto, index) => (
                      <tr key={index}>
                        <td>{producto.Nombre || 'Nombre Producto'}</td>
                        <td>{producto.total_movimiento || 0}</td>
                        <td>$ {parseFloat(producto.precio_unitario || 0).toFixed(2)}</td>
                        <td>$ {calcularTotal(producto).toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className={styles['total-final']}>
              <h2>Total {tipoVista === 'gastos' ? 'Gastado' : 'Invertido'}: ${totalFinal.toFixed(2)}</h2>
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