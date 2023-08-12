import { createSlice } from "@reduxjs/toolkit";


export const conjuntosSlice = createSlice({
    name: "Conjuntos",
    initialState: {
        token: localStorage.getItem("token"),
        id_mesero: "",
        conjuntos: []
    },
    reducers: {
        agregarConjunto: (state, action) => {
            const {id_mesero, id_producto, valor, cantidad } = action.payload;
            const valorTotalProducto = valor * cantidad;

            const conjuntoExistente = state.conjuntos.find(
                (conjunto) => conjunto.id_producto === id_producto
            );

            if (conjuntoExistente) {
                conjuntoExistente.cantidad += cantidad;
                conjuntoExistente.valorTotalProducto =
                conjuntoExistente.valor * conjuntoExistente.cantidad;
            } else {
                const nuevoConjunto = {
                    id_mesero,
                    id_producto,
                    valor,
                    cantidad,
                    valorTotalProducto
                };
                state.id_mesero = id_mesero
                state.conjuntos.push(nuevoConjunto);
            }
        },

        limpiarState: (state, action) => {
            state.conjuntos = action.payload
        },

        enviarLaData: async(state) => {
            const sumaTotal = state.conjuntos.reduce((acumulador, objeto) => acumulador + objeto.valorTotalProducto, 0);
            const bodyConjunto = {
                id_mesero: state.id_mesero,
                valor_total_conjunto: `${sumaTotal}`
            }

            await fetch(`http://localhost:3000/api/crear_conjunto`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${state.token}`,
                    "Cache-Control": "no-cache",
                    "Pragma": "no-cache",
                },
                body: JSON.stringify(bodyConjunto)
            })
            .then((data) => data.json())
            .then((response) => {
                state.conjuntos.forEach((producto) => {

                    const bodyProducto = {
                        id_producto: producto.id_producto,
                        id_conjunto: response.result[0].id_conjunto,
                        cantidad_por_unidad: producto.cantidad,
                        precio_sumado: producto.valorTotalProducto
                    }

                    fetch(`http://localhost:3000/api/enviar_producto_conjunto`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "authorization": `Bearer ${state.token}`,
                            "Cache-Control": "no-cache",
                            "Pragma": "no-cache",
                        },
                        body: JSON.stringify(bodyProducto)
                    })
                    .then((data) => data.json())
                    .then(() =>{
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
    }
});


export const negocioInfo = createSlice({
    name: "negocioInfo",
    initialState: {
        nombreNegocio: "",
        usuarioNegocio: ""
    },
    reducers: {
        cambiarInfo: (state, action) => {
            const { nombre_empresa, usuario_empresa} = action.payload[0]
            state.nombreNegocio = nombre_empresa
            state.usuarioNegocio = usuario_empresa
        }
    }
})



export const {
    agregarConjunto,
    limpiarState,
    enviarLaData
} = conjuntosSlice.actions;

export const{
    cambiarInfo
} = negocioInfo.actions
