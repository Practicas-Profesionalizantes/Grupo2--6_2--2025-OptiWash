
import { useState, useEffect } from 'react';
import axios from 'axios';
import ModalMovimiento from '../../componentes/inventario/ModalMovimiento.jsx';
import './inventario.css';

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
    <div className='cuerpo'>
      <div className="opciones">
        <button className="boton-i" id="agregar" onClick={() => abrirModal('agregar')}>
          Agregar
        </button>
        <button className="boton-i" id="utilizado" onClick={() => abrirModal('utilizar')}>
          Utilizado
        </button>
      </div>

      <div className="contenedor">
        {productos.map(p => (
          <div className="tarjetas-i" key={p.ID}>
            <span className="Nombre">{p.Nombre}</span>
            <div className='img-productos'>
              <img src={p.Img} alt={p.Nombre}/>
            </div>
            <div className="down">
              <p>Total:</p>
              <h2 className="litros">{p.Bidon} Bidones</h2>
            </div>
            <div className="precio-tarjeta">
              ${parseFloat(p.precio_unitario || 0).toFixed(2)}/Bidón
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