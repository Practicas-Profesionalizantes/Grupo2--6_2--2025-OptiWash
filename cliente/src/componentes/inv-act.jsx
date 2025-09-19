import React, {useState} from "react";
import axios from "axios";


function FormInventario({ onClose, onSuccess }) {
    const [bidon, setBidon] = useState('');
    const [mensaje, setMensaje] = useState('');

    const EnviarMensaje = async (e) => {
        e.preventDefault();

    try {
        const response = await axios.post('/api/inventario/actualizar', {
            valor: bidon
        });
        setMensaje(response.data.mensaje);
        setBidon('');
        const res = await axios.get('/api/inventario/productos');
        setProductos(res.data);
        onSuccess(response.data.mensaje);
        } catch (error) {
            setMensaje('Error al enviar los datos');
            console.error('Error:', error);
            }
        };

        return(<>
            <div className="form-container">
                <h2>Nombre Producto</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                    />
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={onClose}>
                    Cancelar
                    </button>
                </form>
            {mensaje && <p>{mensaje}</p>}
            </div>
        </>)
}
export default FormInventario;