// src/components/InventarioEdicion.jsx
import { useState } from 'react';
import axios from 'axios';
import '../style/AgregarEliminar.css';

function InventarioEdicion({ productos, recargarProductos }) {
  const [modo, setModo] = useState(null);
  const [litrosEditados, setLitrosEditados] = useState({});
  const [mensaje, setMensaje] = useState('');

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
    recargarProductos();

    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <div>
      {modo === null && (
        <>
          {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
          <div className="opciones">
            <button className="boton-i" onClick={() => setModo('agregar')}>Agregar</button>
            <button className="boton-i" onClick={() => setModo('utilizado')}>Utilizado</button>
          </div>
        </>
      )}

      {modo !== null && (
          <div className={modo === 'utilizado' ? 'contenedor-form-agregar' : 'contenedor-form'} >


            <h2 style={{textAlign:"center"}}>{modo === 'agregar' ? 'Agregar productos al inventario' : 'Registrar productos utilizados'}</h2>
            <button onClick={() => setModo(null)} className='boton-ae' id='volver'>Volver</button>
            <table className="tabla-inventario">
                <thead>
                <tr>
                    <th>Producto</th>
                    <th>Litros</th>
                </tr>
                </thead>
                <tbody>
                {productos.map(p => (
                    <tr key={p.ID}>
                    <td><strong>{p.Nombre}</strong></td>
                    <td>
                        <input
                        type="number"
                        placeholder="Litros"
                        min="0"
                        max={modo === 'utilizado' ? p.Litros : undefined}
                        onChange={e => handleLitrosChange(p.ID, e.target.value)}
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={confirmarCambios} className='boton-ae' id='confirmar'>
              Confirmar
            </button>
          </div>
      )}
    </div>
  );
}

export default InventarioEdicion;
