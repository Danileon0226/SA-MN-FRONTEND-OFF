import { useEffect, useState } from "react";
import Close from "../../assets/icons/close-line.svg";
import { useDispatch, useSelector } from "react-redux";
import "./MaxMin.css";
import {
    agregarCantidad,
    agregarId,
    quitarCantidadState,
} from "../../Store/Slices";

export default function MaxMin({ cerrarState, cerrarConfirmar }) {
    const dispatch = useDispatch();
    const productosActualizados = useSelector(
        (state) => state.ActualizarConjunto.productosActualizados
    );

    const dataInfoState = useSelector((state) => state.maxminLayoutInfo);

    const agregarCantidadState = (modo, id_conjunto, id_producto, valor, cantidad) => {
        const conjunto = {
            modo,
            id_producto,
            valor,
            cantidad,
        };
        dispatch(agregarId(id_conjunto));
        dispatch(agregarCantidad(conjunto));
    };

    const quitarDelState = (modo, id_producto, cantidad) => {
        const conjunto = {
            modo,
            id_producto,
            cantidad,
        };
        dispatch(quitarCantidadState(conjunto));
    };

    const conjuntoEnEstado = productosActualizados.find(
        (conjunto) => conjunto.id_producto === dataInfoState.id_producto
    );

    const cantidadAcumulada = conjuntoEnEstado ? conjuntoEnEstado.cantidad : 0;

    console.log(productosActualizados)

    if (dataInfoState.modo === "agregar") {
        return (
            <div className="labelMinMax">
                <div className="labelContainer">
                    <div className="closeDiv">
                        <button onClick={cerrarState}>
                            <img src={Close} alt="" />
                        </button>
                    </div>
                    <h2>Agregar a la cantidad ordenada</h2>
                    <div className="cantidadBotones">
                        <button
                            disabled={cantidadAcumulada === 0}
                            onClick={() =>
                                quitarDelState(
                                    "agregando",
                                    dataInfoState.id_producto,
                                    1
                                )
                            }>
                            -
                        </button>
                        <p>{cantidadAcumulada}</p>
                        <button
                            disabled={cantidadAcumulada === dataInfoState.stock}
                            onClick={() =>
                                agregarCantidadState(
                                    "agregando",
                                    dataInfoState.id_conjunto,
                                    dataInfoState.id_producto,
                                    parseFloat(dataInfoState.valor),
                                    1
                                )
                            }>
                            +
                        </button>
                    </div>
                    <div className="labelbtn">
                        <button onClick={cerrarConfirmar}>Confirmar</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="labelMinMax">
                <div className="labelContainer">
                    <div className="closeDiv">
                        <button onClick={cerrarState}>
                            <img src={Close} alt="" />
                        </button>
                    </div>
                    <h2>Quitar de la cantidad ordenada</h2>
                    <div className="cantidadBotones">
                        <button
                            disabled={cantidadAcumulada === 0}
                            onClick={() =>
                                quitarDelState(
                                    "quitando",
                                    dataInfoState.id_producto,
                                    1
                                )
                            }>
                            -
                        </button>
                        <p>{cantidadAcumulada}</p>
                        <button
                            disabled={
                                cantidadAcumulada ===
                                dataInfoState.cantidadOrdenada
                            }
                            onClick={() =>
                                agregarCantidadState(
                                    "quitando",
                                    dataInfoState.id_conjunto,
                                    dataInfoState.id_producto,
                                    parseFloat(dataInfoState.valor),
                                    1
                                )
                            }>
                            +
                        </button>
                    </div>
                    <div className="labelbtn">
                        <button onClick={cerrarConfirmar}>Confirmar</button>
                    </div>
                </div>
            </div>
        );
    }
}
