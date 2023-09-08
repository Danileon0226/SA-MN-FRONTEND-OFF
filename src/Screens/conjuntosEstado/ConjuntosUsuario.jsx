import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import './ConjuntosUsuario.css'

import Navbar from "../../Components/Navbar/Navbar"
import ToolTip from "../../Components/ToolTip/ToolTip"
import ConjuntosLayout from "../../Components/ConjuntosLayout/ConjuntosLayout"
import { useDispatch } from "react-redux"
import { limpiarEstado } from "../../Store/Slices"

export default function ConjuntosUsuario() {
    const [conjuntosUsuario, setConjuntosUsuario] = useState([])
    const [usuarioData, setUsuarioData] = useState([])
    const [mostrarProductosLayout, setMostrarProductosLayout] = useState(false)
    const [conjuntoId, setConjuntoId] = useState("")
    
    const dispatch = useDispatch()

    const { id_empleado } = useParams()
    const token  = localStorage.getItem("token")

    useEffect(() => {
        const traerConjuntosUsuario = async () => {
            await fetch(`http://localhost:3000/api/obtener_conjuntosId/${id_empleado}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                },
            })
                .then((data) => data.json())
                .then((response) => {
                    setConjuntosUsuario(response.result)
                    fetch(`http://localhost:3000/api/obtener_empleadosId/${id_empleado}`, {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`,
                            "Cache-Control": "no-cache",
                            Pragma: "no-cache",
                        },
                    })
                        .then((data) => data.json())
                        .then((response) => setUsuarioData(response.result[0]))
                        .catch((err) => console.log(err))
                })
                .catch((err) => console.log(err))
        }

        traerConjuntosUsuario()
    }, [])



    const handleMostrarLayout = (id_conjunto) => {
        asignarIdConjunto(id_conjunto)
        setMostrarProductosLayout(!mostrarProductosLayout);
        if(mostrarProductosLayout === false){
            limpiarStateAlCerrar()
        }
    };

    const limpiarStateAlCerrar = () => {
        dispatch(limpiarEstado([]));
    };

    const asignarIdConjunto  = (id_conjunto) => {
        setConjuntoId(id_conjunto)
    }

    return (
        <div className="container">
            <Navbar />
            {mostrarProductosLayout && (
                <ConjuntosLayout cerrar={handleMostrarLayout} id_conjunto={conjuntoId} id_mesero={id_empleado}/>
            )}
            <div className="content sinPadding">
                <h2 className="seccionTitle">Conjuntos por pagar de {usuarioData.nombre_mesero}</h2>

                <div className="usuarioConjuntosContainer">
                    {conjuntosUsuario.length === 0 ? (
                        <h3>Este usuario no tiene ningun conjunto activo</h3>
                    ): (
                        conjuntosUsuario.map((conjunto, index) => (
                            <button key={index} onClick={() => handleMostrarLayout(conjunto.id_conjunto)} className="ConjuntosCard" title="Haz click para abrir">
                                <p><b>Valor Conjunto:</b> ${conjunto.valor_total_conjunto}</p>
                                <p><b>Estado: </b> {conjunto.estado}</p>
                                <div className="tooltipContainer">
                                    <ToolTip mensaje="De click si desea, pagar o modificar el conjunto." titulo="Conjunto"/>
                                </div>
                            </button>
                        ))
                    )}
                </div>
                <div className="barraHorizontal">
                    <h2>Total que debe: ${usuarioData.total_que_debe}</h2>
                </div>
            </div>
        </div>
    )
}
