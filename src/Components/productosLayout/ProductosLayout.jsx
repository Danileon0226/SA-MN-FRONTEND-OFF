import { useEffect, useState } from "react"
import Close from '../../assets/icons/close-line.svg'
import { useDispatch, useSelector } from "react-redux"
import { agregarConjunto, enviarLaData, quitarCantidad } from "../../Store/Slices"

import './ProductosLayout.css'

export default function ProductosLayout({  cerrar, abrirMesero }) {
    const [productos, setProductos] = useState([])
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const productosEnState = useSelector(state => state.Conjuntos.conjuntos)

    const obtenerProductos = async () => {
        await fetch(`http://localhost:3000/api/obtener_productos`, {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
            },
        })
        .then((data) => data.json())
        .then((response) => setProductos(response.result))
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        obtenerProductos();
        
    }, [cerrar]);


    const enviarAlState = (id_producto, valor, cantidad) => {
        const conjunto ={
            id_producto,
            valor,
            cantidad
        }
        dispatch(agregarConjunto(conjunto))
        
    }

    const quitarDelState = (id_producto, cantidad) => {
        const conjunto ={
            id_producto,
            cantidad
        }
        dispatch(quitarCantidad(conjunto))
        
    }
    
    console.log(productosEnState)

    return (
        <div className="ProductosLayout">
            <div className="ProductosForm">
                <div className="closeDiv">
                    <button onClick={cerrar}><img src={Close} alt="" /></button>
                </div>
                <div className="ProductosContainer">
                    {productos.map((producto, index) => {

                        const conjuntoEnEstado = productosEnState.find(conjunto => conjunto.id_producto === producto.id_producto);
                        const cantidadAcumulada = conjuntoEnEstado ? conjuntoEnEstado.cantidad : 0;

                        return (
                            <div key={index} className="productoCard">
                                <div className="ImgProductContainer">
                                    <img src={producto.imagen_producto_url} alt="" />
                                </div>
                                <p className="NombreProducto">{producto.nombre_producto}</p>
                                <p className="EnInventario"><b>En inventario: </b> {producto.stock}</p>
                                <p className="PrecioUnidad">${producto.valor_producto}</p>
                                <div className="cantidadBotones">
                                    <button onClick={() => quitarDelState(producto.id_producto, 1)}>-</button>
                                        <p>{cantidadAcumulada}</p>
                                    <button onClick={() => enviarAlState(producto.id_producto, parseFloat(producto.valor_producto), 1)}>+</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="LayoutControles">
                    <button disabled={productosEnState.length === 0} onClick={() => abrirMesero()}>Seleccionar Mesero</button>
                </div>
            </div>
        </div>
    )
}
