
import { useState, useEffect } from 'react';
import axios from 'axios';
import ModalMovimiento from '../../componentes/inventario/ModalMovimiento.jsx';
import styles from './inventario.module.css';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [tipoModal, setTipoModal] = useState(null); 

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await axios.get('/api/inventario');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setTipoModal(null);
  };

  const handleExito = () => {
    cargarProductos();
    cerrarModal();
  };

  return (
    <div className={styles.cuerpo}>
      <div className={styles.opciones}>
        <button className={styles['boton-i']}  id={styles.agregar} onClick={() => abrirModal('agregar')}>
          Agregar
        </button>
        <button className={styles['boton-i']} id={styles.utilizado} onClick={() => abrirModal('utilizar')}>
          Utilizado
        </button>
      </div>

      <div className={styles.contenedor}>
        {productos.map(p => (
          <div className={styles['tarjetas-i']} key={p.ID}>
            <span className={styles.Nombre}>{p.Nombre}</span>
            <div className={styles['img-productos']}>
              <img src={p.Img} alt={p.Nombre}/>
            </div>
            <div className={styles.down}>
              <p>Bidones:</p>
              <h2 className={styles.litros}>{p.Bidon} </h2>
            </div>
            <div className={styles['precio-tarjeta']}>
              ${parseFloat(p.precio_unitario || 0).toFixed(2)}c/u
            </div>
          </div>
        ))}
      </div>

      {modalAbierto && (
        <ModalMovimiento
          tipo={tipoModal}
          productos={productos}
          onClose={cerrarModal}
          onExito={handleExito}
        />
      )}
    </div>
  );
}

export default Inventario;