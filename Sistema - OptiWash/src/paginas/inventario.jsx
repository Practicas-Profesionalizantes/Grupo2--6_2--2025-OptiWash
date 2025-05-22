import "../style/inventario.css"

function Inventario() {
    return(<>
    <body>
        <h1>Inventario</h1>
        <button>Agragar</button>
        <div className="tarjetas">
            <div className="tarjeta">
                <img src="../assets/Shampo" alt="" />
                <h2>nombre</h2>
                <div className="b-i">    
                    <button>Actualizar</button>
                </div>
            </div>
        </div>
    </body>
    </>)
}

export default Inventario;