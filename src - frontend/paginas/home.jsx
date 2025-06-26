import "../style/Home.css"
import inventario from "../img/inventario/inventario.png";

function Home (){
    return(<>
        <body>
            <h1>Home</h1>
            <div className="tarjetas">
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