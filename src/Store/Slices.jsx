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
            const {id_producto, valor, cantidad } = action.payload;
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
                    id_producto,
                    valor,
                    cantidad,
                    valorTotalProducto
                };
                state.conjuntos.push(nuevoConjunto);
            }
        },

        limpiarState: (state, action) => {
            state.conjuntos = action.payload
        },

        quitarCantidad: (state, action) => {
            const { id_producto, cantidad } = action.payload;
            const conjuntoIndex = state.conjuntos.findIndex((conjunto) => conjunto.id_producto === id_producto);

            if (conjuntoIndex !== -1) {
                state.conjuntos[conjuntoIndex].cantidad -= cantidad;

                if (state.conjuntos[conjuntoIndex].cantidad <= 0) {
                    state.conjuntos.splice(conjuntoIndex, 1);
                }
            }
        },

        añadirIdEmpleado: (state, action) => {
            state.id_mesero = action.payload
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

export const actualizarConjunto = createSlice({
    name: "ActualizarConjunto",
    initialState: {
        id_conjunto: "",
        productosActualizados: []
    },
    reducers:{
        agregarCantidad: (state, action) => {
            const {modo, id_producto, valor, cantidad } = action.payload;
            const valorTotalProducto = valor * cantidad;
    
            const conjuntoExistente = state.productosActualizados.find(
                (productosActualizados) => productosActualizados.id_producto === id_producto
            );
    
            if (conjuntoExistente) {
                conjuntoExistente.cantidad += cantidad;
                conjuntoExistente.valorTotalProducto =
                conjuntoExistente.valor * conjuntoExistente.cantidad;
            } else {
                const nuevoConjunto = {
                    modo,
                    id_producto,
                    valor,
                    cantidad,
                    valorTotalProducto
                };
                state.productosActualizados.push(nuevoConjunto);
            }

        },

        quitarCantidadState: (state, action) => {
            const { id_producto, cantidad } = action.payload;
            const conjuntoIndex = state.productosActualizados.findIndex((conjunto) => conjunto.id_producto === id_producto);

            if (conjuntoIndex !== -1) {
                state.productosActualizados[conjuntoIndex].cantidad -= cantidad;

                if (state.productosActualizados[conjuntoIndex].cantidad <= 0) {
                    state.productosActualizados.splice(conjuntoIndex, 1);
                }
            }
        },

        eliminarProducto: (state, action) => {

        },
        
        agregarId: (state, action) => {
            const id = action.payload
            state.id_conjunto = id;
        },

        limpiarEstado: (state) => {
            state.id_conjunto = ""
            state.productosActualizados = []
        }
    }
})


export const MaxMinLayoutInfo = createSlice({
    name: "maxminLayoutInfo",
    initialState: {
        modo: "",
        id_conjunto: "",
        id_producto: "",
        cantidadOrdenada: 0,
        valor: 0,
        stock: 0,
    },
    reducers: {
        activarLayout: (state, actions) => {
            const {modo, id_conjunto, id_producto, cantidadOrdenada, valor, stock} = actions.payload

            state.modo = modo
            state.id_conjunto = id_conjunto
            state.id_producto = id_producto
            state.cantidadOrdenada = cantidadOrdenada
            state.valor = valor
            state.stock = stock
        }
    }
})
export const {
    agregarConjunto,
    limpiarState,
    quitarCantidad,
    añadirIdEmpleado
} = conjuntosSlice.actions;

export const{
    cambiarInfo
} = negocioInfo.actions

export const {
    quitarCantidadState,
    agregarCantidad,
    limpiarEstado,
    agregarId
} = actualizarConjunto.actions

export const {
    activarLayout
} = MaxMinLayoutInfo.actions