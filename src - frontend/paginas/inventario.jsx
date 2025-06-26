import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      {/* Botones principales */}
      {modo === null && (
        <>
          {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
          <h2>Inventario</h2>
          <button onClick={() => setModo('agregar')}>Agregar</button>
          <button onClick={() => setModo('utilizado')}>utilizado</button>
          <div>
            {productos.map(p => (
              <div key={p.ID}>
                <img src={p.Img} alt={p.Nombre} width="10%" />
                <h4>{p.Nombre}</h4>
                <p>{p.Litros} L </p>
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
          <div>
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
