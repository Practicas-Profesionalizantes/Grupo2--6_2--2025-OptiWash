import "../style/inventario.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [consumido, setConsumido] = useState("");

  const cargarProductos = () => {
    axios.get("/api/inventario").then((res) => setProductos(res.data));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setConsumido("");
  };

  const actualizarCantidad = () => {
    const cantidadFinal = productoSeleccionado.Bidon - parseInt(consumido);

    axios
      .put(`/api/inventario/actualizar/${productoSeleccionado.ID}`, {
        Bidon: cantidadFinal,
      })
      .then((res) => {
        console.log("Cantidad actualizada");
        cargarProductos();
        setProductoSeleccionado(null);
      });
  };
  return (
    <>
      <div>
        <h1>inventario</h1>
        <div>
          {productos.map((producto) => (
            <div key={producto.ID}>
              <h2>{producto.Nombre}</h2>
              <img
                src={producto.Img}
                style={{ width: "200px", borderRadius: "10px" }}
                alt={producto.Nombre}
              />
              <h2>{producto.Bidon}</h2>
              <button onClick={() => seleccionarProducto(producto)}>
                Seleccionar
              </button>
            </div>
          ))}
        </div>
        {productoSeleccionado && (
          <div>
            <h3>Registrar consumo de: {productoSeleccionado.Nombre}</h3>
            <p>
              Bidones actuales: <strong>{productoSeleccionado.Bidon}</strong>
            </p>

            <input
              type="number"
              value={consumido}
              onChange={(e) => setConsumido(e.target.value)}
              placeholder="Cantidad consumida"
              min={1}
              max={productoSeleccionado.Bidon}
            />

            {consumido !== "" &&
              parseInt(consumido) > productoSeleccionado.Bidon && (
                <p style={{ color: "red" }}>
                  No podés consumir más de {productoSeleccionado.Bidon} bidones
                </p>
              )}

            {consumido !== "" &&
              parseInt(consumido) <= productoSeleccionado.Bidon && (
                <p>
                  Quedarían:{" "}
                  <strong>
                    {productoSeleccionado.Bidon - parseInt(consumido)}
                  </strong>{" "}
                  bidones
                </p>
              )}

            <button
              onClick={actualizarCantidad}
              disabled={
                isNaN(consumido) ||
                consumido === "" ||
                parseInt(consumido) > productoSeleccionado.Bidon
              }
            >
              Actualizar
            </button>
            <button onClick={() => setProductoSeleccionado(null)}>
            Volver al inventario
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export default Inventario;
