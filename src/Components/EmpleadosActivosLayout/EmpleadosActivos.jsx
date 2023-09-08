import { useEffect, useState } from "react";
import "./EmpleadosActivos.css";
import { useDispatch, useSelector } from "react-redux";
import Close from "../../assets/icons/close-line.svg";
import { añadirIdEmpleado, limpiarState } from "../../Store/Slices";

export default function EmpleadosActivos({ cerrar }) {
    const dispatch = useDispatch();
    const [dataEmpleados, setDataEmpleados] = useState([]);
    const empleadoSeleccionadoState = useSelector((state) => state.Conjuntos);
    const productosEnState = useSelector((state) => state.Conjuntos.conjuntos)
    const idMeseroState = useSelector((state) => state.Conjuntos.id_mesero)
    const token = localStorage.getItem("token");

    useEffect(() => {
        const traerMeseros = async () => {
            await fetch("http://localhost:3000/api/obtener_empleados/activos", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                },
            })
                .then((data) => data.json())
                .then((response) => {
                    setDataEmpleados(response.result);
                })
                .catch((err) => console.log(err));
        };

        traerMeseros();
    }, []);

    const enviarLaData = async () => {
        const sumaTotal = productosEnState.reduce((acumulador, objeto) => acumulador + objeto.valorTotalProducto, 0);
        const bodyConjunto = {
            id_mesero: idMeseroState,
            valor_total_conjunto: `${sumaTotal}`
        }

        await fetch(`http://localhost:3000/api/crear_conjunto`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "Cache-Control": "no-cache",
                "Pragma": "no-cache",
            },
            body: JSON.stringify(bodyConjunto)
        })
        .then((data) => data.json())
        .then((response) => {
            productosEnState.forEach((producto) => {

                const bodyProducto = {
                    id_producto: producto.id_producto,
                    id_conjunto: response.result[0].id_conjunto,
                    cantidad_por_unidad: producto.cantidad,
                    precio_sumado: producto.valorTotalProducto
                }

                console.log(response.result[0].id_conjunto,)

                fetch(`http://localhost:3000/api/enviar_producto_conjunto`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,
                        "Cache-Control": "no-cache",
                        "Pragma": "no-cache",
                    },
                    body: JSON.stringify(bodyProducto)
                })
                .then((data) => data.json())
                .then(() =>{
                    dispatch(limpiarState())
                    window.location.reload()
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const agregarMesero = (id) => {
        dispatch(añadirIdEmpleado(id));
    };

    console.log(empleadoSeleccionadoState);

    return (
        <div className="empleadosLayout">
            <div className="empleadosForm">
                <div className="closeDiv">
                    <button onClick={cerrar}>
                        <img src={Close} alt="" />
                    </button>
                </div>
                <div className="meserosContainer">
                    {dataEmpleados.length === 0 ? (
                        <p>Debe tener al menos un empleado activo</p>
                    ) : (
                        dataEmpleados.map((empleado, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    agregarMesero(empleado.id_mesero)
                                }
                                className="empleadoSeleccionCard">
                                <p>{empleado.nombre_mesero}</p>
                            </button>
                        ))
                    )}
                </div>
                <div className="LayoutControles">
                    <button
                        disabled={empleadoSeleccionadoState.id_mesero === ""}
                        onClick={() => enviarLaData()}>
                        Finalizar
                    </button>
                </div>
            </div>
        </div>
    );
}
