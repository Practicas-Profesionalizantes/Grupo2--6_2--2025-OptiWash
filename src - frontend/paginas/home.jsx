import "../style/Home.css"
import inventario from "../img/inventario/inventario.png";

import asistencias from "../img/inventario/asistencias.png";
import autos_lavados from "../img/inventario/autos_lavados.png";

function Home (){
    return(<>
        <body>
            
            <div className="tarjetas">
                <div className="tarjeta" id="t1">
                    <h2>INVENTARIO</h2>
                    <img src={inventario} alt=""/>
                </div>
                <div className="tarjeta" id="t2">
                    <h2>ASISTENCIAS</h2>
                    <img src={asistencias} alt=""/>
                </div>
                <div className="tarjeta" id="t3">
                    <h2>REGISTROS DE AUTOS</h2>
                    <img src={autos_lavados} alt=""/>
                <div className="tarjeta">
                    <h2>INVENTARIO</h2>
                    <img src={inventario} alt=""/>
                </div>
                <div className="tarjeta">
                    <h2>ASISTENCIAS</h2>
                </div>
                <div className="tarjeta">
                    <h2>REGISTRO DE AUTOS LAVADOS</h2>
                </div>


            </div>
            
        </body>
    </>)
}

export default Home;