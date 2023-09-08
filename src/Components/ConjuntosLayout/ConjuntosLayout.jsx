import { useEffect, useState } from "react";
import Close from "../../assets/icons/close-line.svg";
import "./ConjuntosLayout.css";
import { useDispatch, useSelector } from "react-redux";
import { activarLayout, limpiarEstado } from "../../Store/Slices";
import ToolTip from "../ToolTip/ToolTip";
import MaxMin from "../AumentarDisminuir/MaxMin";

export default function ConjuntosLayout({ id_conjunto, cerrar, id_mesero }) {
    const [productos, setProductos] = useState([]);
    const [layoutVisible, setLayoutVisible] = useState(false)
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const productosActualizados = useSelector(
        (state) => state.ActualizarConjunto.productosActualizados
    );
    const idConjuntoState = useSelector(
        (state) => state.ActualizarConjunto.id_conjunto
    );

    useEffect(() => {
        const obtenerProductosConjunto = async () => {
            await fetch(
                `http://localhost:3000/api/obtener_productos_conjuntos/${id_conjunto}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        Pragma: "no-cache",
                    },
                }
            )
                .then((data) => data.json())
                .then((response) => setProductos(response.result))
                .catch((err) => console.log(err));
        };

        obtenerProductosConjunto();
    }, []);


    const actuatizarProducto = async () => {
        await productosActualizados.map((producto) => {

            const body = {
                modo: producto.modo,
                id_conjunto: idConjuntoState,
                id_producto: producto.id_producto,
                cantidad: producto.cantidad,
                valorTotalProducto: producto.valorTotalProducto,
                id_mesero
            }

            fetch("http://localhost:3000/api/actualizar_productos_conjuntos/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                },
                body: JSON.stringify(body)
            })
            .then(() => {
                dispatch(limpiarEstado())
                window.location.reload()
            })
            .catch((err) => console.log(err))
        })
    }

    const eliminarDeConjunto = async (id_conjunto, id_producto, cantidad, precio_sumado) => {
        const body = {
            id_producto,
            id_conjunto,
            cantidad, 
            precio_sumado,
            id_mesero
        }

        await fetch(`http://localhost:3000/api/eliminar_producto_conjunto/`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
            body: JSON.stringify(body)
        })
        .then(() => {
            window.location.reload()
        })
        .catch((err) => console.log(err))
    }

    const handleMinMaxLayout = (modo, id_conjunto, id_producto, cantidadOrdenada, valor, stock) => {
        setLayoutVisible(!layoutVisible)
        const objeto = {
            modo,
            id_conjunto,
            id_producto,
            cantidadOrdenada,
            valor, stock
        }
        dispatch(activarLayout(objeto))
    }


    const handleCerrarDeleteState = () => {
        setLayoutVisible(!layoutVisible)
        dispatch(limpiarEstado())
    }


    const handleCerrarConfirmar = () => {
        setLayoutVisible(!layoutVisible)
    }

    return (
        <div className="conjuntosLayoutContainer">
            {layoutVisible && (
                <MaxMin cerrarState={handleCerrarDeleteState} cerrarConfirmar={handleCerrarConfirmar}/>
            )}
            <div className="conjuntosLayoutForm">
                <div className="closeDiv">
                    <button onClick={cerrar}>
                        <img src={Close} alt="" />
                    </button>
                </div>
                <div className="productosCardContainer">
                    {productos.length === 0 ? (
                        <p>No se pudieron obtener los productos</p>
                    ) : (
                        productos.map((producto, index) => {

                            // const ModoProducto = productosActualizados.find(
                            //     (conjunto) => conjunto.id_producto === producto.id_producto
                            // )

                            // const modoFinal = ModoProducto.modo === "agregando" ? "agregando" : "quitando"
                            return (
                                <div key={index} className="productoLayoutCard">
                                    <div className="imgProducto">
                                        <img
                                            src={producto.imagen_producto_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="productoInfo">
                                        <p>{producto.nombre_producto}</p>
                                        <p>
                                            <b>Cantidad ordenada:</b>{" "}
                                            {producto.cantidad_por_unidad}
                                        </p>
                                        <p>
                                            <b>Precio Total:</b>{" "}
                                            {producto.precio_sumado}
                                        </p>
                                        <p>
                                            <b>En stock:</b> {producto.stock}
                                        </p>
                                    </div>
                                    <div className="accionesBtn">
                                        <button disabled={producto.stock === 0 ? true: false} onClick={() => handleMinMaxLayout("agregar", producto.id_conjunto, producto.id_producto, producto.cantidad_por_unidad, producto.valor_producto, producto.stock)}>Agregar a la cantidad ordenada</button>
                                        <button disabled={producto.cantidad_por_unidad === 0 ? true: false} onClick={() => handleMinMaxLayout("quitar", producto.id_conjunto, producto.id_producto, producto.cantidad_por_unidad, producto.valor_producto, producto.stock)}>Quitar de la cantidad ordenada</button>
                                    </div>
                                    <div className="disminuirAumentarbtns">

                                    </div>
                                    <div className="eliminarBoton">
                                        <button onClick={() => eliminarDeConjunto(producto.id_conjunto, producto.id_producto, producto.cantidad_por_unidad, producto.precio_sumado)}>Eliminar del conjunto
                                            <div className="tooltipContainer">
                                                <ToolTip titulo="Eliminar el producto del conjuto" mensaje="Si elimina el producto del conjunto, la cantidad volvera al inventario y se restara el precio."/>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="pagarBtn">
                    <button disabled={productosActualizados.length === 0 ? true: false } onClick={() => actuatizarProducto()}>Actualizar</button>
                    <button disabled={productos.length === 0 ? true : false}>
                        Pagar Conjunto
                    </button>
                </div>
            </div>
        </div>
    );
}




