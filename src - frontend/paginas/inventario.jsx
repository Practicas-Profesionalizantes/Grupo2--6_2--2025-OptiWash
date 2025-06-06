    import "../style/inventario.css"
    import axios from "axios";
    import {useEffect, useState} from "react";

    function Inventario() {
        const [productos, setProductos] = useState([]);
        const [mostrarFormulario, setMostrarFormulario] = useState(false);
        const [mensajeGlobal, setMensajeGlobal] = useState('');

        useEffect(()=> {
            axios.get('/api/inventario/productos')
            .then(res =>{
                setProductos(res.data)
            })
            .catch(err => {
                console.error('Error al obtener productos:', err);
            })
        },[])

        return(<>
        <div>
            <h1>inventario</h1>
                <div className="mostrar-form">
                    <button 
                        onClick={() => setMostrarFormulario(true)}
                        className="btn btn-show-form"
                    >
                        {mostrarFormulario ? 'Formulario Visible' : 'Abrir Formulario'}
                    </button>

                    {mostrarFormulario && (
                        <FormularioDatos
                        onClose={() => {
                            setMostrarFormulario(false);
                            setMensajeGlobal('');
                        }}
                        onSuccess={(mensaje) => {
                            setMensajeGlobal(mensaje);
                            setMostrarFormulario(false);
                        }}
                        />
                    )}
                    {mensajeGlobal && (
                        <div className="global-message success">
                        {mensajeGlobal}
                        </div>
                    )}
                </div>
            <div>
                {productos.map(producto => (
                    <div key={producto.ID}>
                        <h2>{producto.Nombre}</h2>
                        <img src={producto.Img} style={{width:'200px', borderRadius:'10px'}}/>
                        <button>Seleccionar</button>
                    </div>
                ))}
            </div>
        </div>
        </>)
    }
    export default Inventario;

