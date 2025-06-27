import "../style/Home.css"
import inventario from "../img/inventario/inventario.png";
import asistencias from "../img/inventario/asistencias.png";
import autos_lavados from "../img/inventario/autos_lavados.png";
import { Link } from "react-router-dom";

function Home (){
    return(<>
        <body>
            <div className="tarjetas">
                <Link to="/inventario" style={{textDecoration:"none", color:"black"}}>
                    <div className="tarjeta" id="t1">
                        <h2>INVENTARIO</h2>
                        <img src={inventario} alt=""/>
                    </div>
                </Link>
                <Link to="/asistencia" style={{textDecoration:"none", color:"black"}}>
                    <div className="tarjeta" id="t2">
                        <h2>ASISTENCIAS</h2>
                        <img src={asistencias} alt=""/>
                    </div>
                </Link>
                <Link to="/registro_autos" style={{textDecoration:"none", color:"black"}}>
                    <div className="tarjeta" id="t3">
                        <h2>REGISTROS DE AUTOS</h2>
                        <img src={autos_lavados} alt=""/>
                    </div>
                </Link>
            </div>
        </body>
    </>)
};

export default Home;