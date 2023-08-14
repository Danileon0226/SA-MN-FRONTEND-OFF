import userLogo from '../../assets/icons/emotion-line.svg'
import Navbar from '../../Components/Navbar/Navbar'
import { useEffect, useState } from 'react'

import './Empleados.css'

export default function Empleados() {
    const [dataEmpleado, setDataEmpleado] = useState([])

    const token = localStorage.getItem("token")
    useEffect(() => {
        fetch("http://localhost:3000/api/obtener_empleados/normal",{
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            },
        })
        .then((data) => data.json())
        .then((response) => {
            setDataEmpleado(response.result)
        })
    }, [])

    const activarEmpleado = (id) => {
        fetch(`http://localhost:3000/api/actualizar_estado/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            },
            body: JSON.stringify({estado: "Activo"}),
        })
        .then(window.location.reload())
    }

    const desactivarEmpleado = (id) => {
        fetch(`http://localhost:3000/api/actualizar_estado/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            },
            body: JSON.stringify({estado: "falso"}),
        })
        .then(window.location.reload())
    }

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <div className="empleadosContainer">
                    {dataEmpleado.length === 0 ? (
                        <h3 className="sinEmpleados">No hay empleados en la base de Datos</h3>
                    ) : (
                        dataEmpleado.map((empleado, index) => (
                            <div key={index} className="empleadoCard">
                                <img src={userLogo} alt="" />
                                <h3>{empleado.nombre_mesero}</h3>
                                <h4>C.C. {empleado.cedula}</h4>
                                <div className="controles">
                                    {empleado.estado === "falso" ? (
                                        <button className='verde' onClick={() => activarEmpleado(empleado.id_mesero)}>Activar</button>
                                    ): (
                                        <button className='rojo' disabled={empleado.estado === ""} onClick={() => desactivarEmpleado(empleado.id_mesero)}>Desactivar</button>
                                    )}
                                    
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
    
}
