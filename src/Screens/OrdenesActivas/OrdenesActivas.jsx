import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar";
import "./OrdenesActivas.css";
import CaritaIcono from "../../assets/icons/user-smile-line.svg";
import CaritaClaroIcono from "../../assets/icons/user-smile-line-claro.svg";
import ToolTip from "../../Components/ToolTip/ToolTip";

export default function OrdenesActivas() {
    const [empleadoData, setEmpleadosData] = useState([]);
    const [noActivoEmpleadoData, setNoActivoEmpleadoData] = useState([]);
    const [visible, setVisible] = useState(false)

    const token = localStorage.getItem("token");

    useEffect(() => {
        const obtenerEmpleados = async () => {
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
                    setEmpleadosData(response.result);
                    fetch(
                        "http://localhost:3000/api/obtener_empleados/noActivos",
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
                        .then((response) =>
                            setNoActivoEmpleadoData(response.result)
                        )
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        };

        obtenerEmpleados();
    }, [token]);

    const mostrarOcultos = () => {
        setVisible(!visible)
    }

    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <h2 >Ordenes Activas</h2>

                <div className="empleadoCardContainer">
                    {empleadoData.length === 0 ? (
                        <h3 className="sinEmpleado">
                            No hay empleados activos
                        </h3>
                    ) : (
                        empleadoData.map((empleado, index) => (
                            <div key={index} className="empleadoTarjeta">
                                <div className="nombreIconoContainer">
                                    <img
                                        src={CaritaIcono}
                                        alt="Icono de usuario"
                                    />
                                    <h2>{empleado.nombre_mesero}</h2>
                                </div>
                                <div className="empleadoInfo">
                                    <p>
                                        <b>C.C.</b> {empleado.cedula}
                                    </p>
                                    <p>
                                        <b>Dinero que debe: </b>$
                                        {empleado.total_que_debe}
                                    </p>
                                </div>
                                <div className="empleadoBotones">
                                    <Link
                                        to={`/conjuntos_actuales/${empleado.id_mesero}`}
                                        className="empleadoBtn"
                                        title="Conjuntos actuales">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM5.49388 7.0777L13.0001 11.4234V20.11L19.5 16.3469V7.65311L12 3.311L5.49388 7.0777ZM4.5 8.81329V16.3469L11.0001 20.1101V12.5765L4.5 8.81329Z"
                                                fill="rgba(208,211,233,1)"></path>
                                        </svg>
                                    </Link>
                                    <Link
                                        to={`/conjuntos_actuales/${empleado.id_mesero}`}
                                        className="empleadoBtn"
                                        title="Conjuntos Antiguos">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"
                                                fill="rgba(208,211,233,1)"></path>
                                        </svg>
                                    </Link>
                                </div>
                                <div className="tooltipContainer">
                                    <ToolTip
                                        mensaje="Usa el primer botón para observar los conjuntos que están activos actualmente. Usa el segundo botón para observar conjuntos anteriores."
                                        titulo="Modo de uso"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <button onClick={() => mostrarOcultos()} className="MostrarOcultos">{visible ? "Ocultar" : "Mostrar"} empleados no activos</button>
                <div className={visible ? "empleadosNoActivos EmpleadosVisibles" : "empleadosNoActivos"}>
                    <div className="empleadoCardContainer">
                        {noActivoEmpleadoData.length === 0 ? (
                            <h3 className="sinEmpleado">
                                No hay empleados activos
                            </h3>
                        ) : (
                            noActivoEmpleadoData.map((empleado, index) => (
                                <div
                                    key={index}
                                    className="empleadoTarjeta noActivo">
                                    <div className="nombreIconoContainer">
                                        <img
                                            src={CaritaClaroIcono}
                                            alt="Icono de usuario"
                                        />
                                        <h2>{empleado.nombre_mesero}</h2>
                                    </div>
                                    <div className="empleadoInfo">
                                        <p>
                                            <b>C.C.</b> {empleado.cedula}
                                        </p>
                                        <p>
                                            <b>Dinero que debe: </b>$
                                            {empleado.total_que_debe}
                                        </p>
                                    </div>
                                    <div className="empleadoBotones">
                                        <Link
                                            to={`/conjuntos_actuales/${empleado.id_mesero}`}
                                            className="empleadoBtn"
                                            title="Conjuntos Antiguos">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"
                                                    fill="rgba(208,211,233,1)"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
