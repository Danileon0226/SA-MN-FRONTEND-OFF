import { useEffect, useState } from 'react'
import './EmpleadosActivos.css'
import { useDispatch, useSelector } from 'react-redux'
import Close from '../../assets/icons/close-line.svg'
import { añadirIdEmpleado, enviarLaData } from '../../Store/Slices'

export default function EmpleadosActivos({ cerrar }) {
    const dispatch = useDispatch()
    const [dataEmpleados, setDataEmpleados] = useState([])
    const empleadoSeleccionadoState = useSelector(state => state.Conjuntos)
    const token = localStorage.getItem("token")

    useEffect(() => {
        const traerMeseros = async () => {
            await fetch("http://localhost:3000/api/obtener_empleados/activos",{
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                    "Cache-Control": "no-cache",
                    "Pragma": "no-cache"
                },
            })
            .then((data) => data.json())
            .then((response) => {
                setDataEmpleados(response.result)
            })
            .catch((err) => console.log(err))
        }

        traerMeseros()
    }, [])

    const agregarMesero = (id) => {
        dispatch(añadirIdEmpleado(id))
    }
    
    const finalizarCreacion = () => {
        dispatch(enviarLaData())
    }

    
    console.log(empleadoSeleccionadoState)

    return (
        <div className="empleadosLayout">
            <div className="empleadosForm">
                <div className="closeDiv">
                    <button onClick={cerrar}><img src={Close} alt="" /></button>
                </div>
                <div className="meserosContainer">
                    {dataEmpleados.length === 0 ? (
                        <p>Debe tener al menos un empleado activo</p>
                    ): (
                        dataEmpleados.map((empleado, index) => (
                            <button key={index} onClick={() => agregarMesero(empleado.id_mesero)} className="empleadoSeleccionCard">
                                <p>{empleado.nombre_mesero}</p>
                            </button>
                        ))
                    )}
                </div>
                <div className="LayoutControles">
                    <button disabled={empleadoSeleccionadoState.id_mesero === ''} onClick={() => finalizarCreacion()}>Finalizar</button>
                </div>
            </div>
        </div>
    )
}
