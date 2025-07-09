import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/inventario.css'; 


function Inventario() {
  const [productos, setProductos] = useState([]);
  const [modo, setModo] = useState(null);
  const [litrosEditados, setLitrosEditados] = useState({});
  const [mensaje, setMensaje] = useState('');


  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const res = await axios.get('/api/inventario');
    setProductos(res.data);
  };

  const handleLitrosChange = (id, valor) => {
    setLitrosEditados(prev => ({ ...prev, [id]: valor }));
  };

  const confirmarCambios = async () => {
    let huboCambios = false;
  
    for (const producto of productos) {
      const id = producto.ID;
      const valor = parseFloat(litrosEditados[id]);
  
      if (isNaN(valor) || valor <= 0) continue;
  
      const litrosFinal = modo === 'utilizado' ? -valor : valor;
  
      await axios.put(`/api/inventario/actualizar/${id}`, {
        litrosComprados: litrosFinal,
      });
  
      huboCambios = true;
    }
  
    if (huboCambios) {
      setMensaje('Inventario actualizado con éxito.');
    } else {
      setMensaje('No se realizaron cambios.');
    }
  
    setModo(null);
    setLitrosEditados({});
    cargarProductos();
  
    setTimeout(() => setMensaje(''), 3000);
  };
  

  return (
    <div className='cuerpo'>
      {modo === null && (
        <>
          {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
          <div className="opciones">
            <button className="boton" id='agregar' onClick={() => setModo('agregar')}>Agregar</button>
            <button className="boton" id='utilizado' onClick={() => setModo('utilizado')}>Utilizado</button>
          </div>
          <div className="contenedor">
            {productos.map(p => (
              <div className="tarjetas-i" key={p.ID}>
                <spam className="Nombre">{p.Nombre}</spam>
                <div className='img-productos'>
                  <img src={p.Img} alt={p.Nombre} />
                </div>
                <div className="down">
                  <p>Total:</p>
                  <h2 className="litros">{p.Litros} L</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Vista de edición */}
      {modo !== null && (
        <>
          <h2>{modo === 'agregar' ? 'Agregar productos al inventario' : 'Registrar productos utilizados'}</h2>
          <button onClick={() => setModo(null)}>Volver</button>
          <div className='botones-ia'>
            {productos.map(p => (
              <div key={p.ID}>
                <strong>{p.Nombre}</strong>:
                <input
                  type="number"
                  placeholder="Litros"
                  min="0"
                  max={modo === 'utilizado' ? p.Litros : undefined}
                  onChange={e => handleLitrosChange(p.ID, e.target.value)}
                />
              </div>
            ))}
          </div>
          <button onClick={confirmarCambios}>
            Confirmar
          </button>
        </>
      )}
    </div>
  );
}

export default Inventario;
