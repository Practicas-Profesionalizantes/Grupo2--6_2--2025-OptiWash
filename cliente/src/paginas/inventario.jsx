import { useState, useEffect } from 'react';
import axios from 'axios';
import InventarioEdicion from "../componentes/AgregarEliminar.jsx";
import '../style/inventario.css';

function Inventario() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await axios.get('/api/inventario');
    setProductos(res.data);
  };

  return (
    <div className='cuerpo'>
      <InventarioEdicion
        productos={productos}
        recargarProductos={cargarProductos}
      />
      <div className="contenedor">
        {productos.map(p => (
          <div className="tarjetas-i" key={p.ID}>
            <span className="Nombre">{p.Nombre}</span>
            <div className='img-productos'>
              <img src={p.Img} alt={p.Nombre}/>
            </div>
            <div className="down">
              <p>Total:</p>
              <h2 className="litros">{p.Litros} L</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventario;
