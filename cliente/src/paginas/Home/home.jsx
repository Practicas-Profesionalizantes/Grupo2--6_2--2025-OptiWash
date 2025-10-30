import "../Home/Home.css"
import inventario from "../../assets/home/inventario.png";
import asistencias from "../../assets/home/asistencias.png";
import autos_lavados from "../../assets/home/autos_lavados.png";
import { Link } from "react-router-dom";

function Home (){
    return(<>
        <main>
            
            <div className="tarjetas-h">
                <Link to="/inventario" style={{textDecoration:"none", color:"black"}}>
                    <div className="tarjeta-h" id="t1">
                        <h2>INVENTARIO</h2>
                        <img src={inventario} alt=""/>
                    </div>
                </Link>
                <Link to="/asistencia" style={{textDecoration:"none", color:"black"}}>
                    <div className="tarjeta-h" id="t2">
                        <h2>ASISTENCIAS</h2>
                        <img src={asistencias} alt=""/>
                    </div>
                </Link>
                <Link to="/registro_autos" style={{textDecoration:"none", color:"black"}}>
                    <div className="tarjeta-h" id="t3">
                        <h2>REGISTROS DE AUTOS</h2>
                        <img src={autos_lavados} alt=""/>
                    </div>
                </Link>
            </div>
        </main>
    </>)
};

export default Home;