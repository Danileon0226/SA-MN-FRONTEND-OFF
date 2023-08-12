import { useEffect, useState } from "react"
import Close from '../../assets/icons/close-line.svg'
import { useDispatch, useSelector } from "react-redux"
import { agregarConjunto, enviarLaData } from "../../Store/Slices"

import './ProductosLayout.css'

export default function ProductosLayout({ id_mesero, cerrar }) {
    const [productos, setProductos] = useState([])
    const [conjuntosLength, setConjuntosLength] = useState(0)
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

    useEffect(() => {
        if (productosEnState && productosEnState.length > 0) {
            setConjuntosLength(productosEnState.length);
        }
    }, [productosEnState]);


    const enviarAlState = (id_mesero, id_producto, valor, cantidad) => {
        const conjunto ={
            id_mesero,
            id_producto,
            valor,
            cantidad
        }
        dispatch(agregarConjunto(conjunto))
    }

    const finalizarCreacion = () => {
        dispatch(enviarLaData())
    }

    return (
        <div className="ProductosLayout">
            <div className="ProductosForm">
                <div className="closeDiv">
                    <button onClick={cerrar}><img src={Close} alt="" /></button>
                </div>
                <div className="ProductosContainer">
                    {productos.map((producto, index) => (
                        <button onClick={() => enviarAlState(id_mesero, producto.id_producto, parseFloat(producto.valor_producto), 1)} key={index} className="productoCard">
                            <div className="ImgProductContainer">
                                <img src={producto.imagen_producto_url} alt="" />
                            </div>
                            <p className="NombreProducto">{producto.nombre_producto}</p>
                            <p className="EnInventario"><b>En inventario: </b> {producto.stock}</p>
                            <p className="PrecioUnidad">${producto.valor_producto}</p>
                        </button>
                    ))}
                </div>
                <div className="LayoutControles">
                    <button disabled={conjuntosLength < 1 ? true: false} onClick={() => finalizarCreacion()}>Agregar al conjunto</button>
                </div>
            </div>
        </div>
    )
}
