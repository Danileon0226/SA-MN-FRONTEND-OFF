import { configureStore } from "@reduxjs/toolkit";
import { MaxMinLayoutInfo, actualizarConjunto, conjuntosSlice, negocioInfo } from "./Slices";

export default configureStore({
    reducer: {
        Conjuntos: conjuntosSlice.reducer,
        negocioInfo: negocioInfo.reducer,
        ActualizarConjunto: actualizarConjunto.reducer,
        maxminLayoutInfo: MaxMinLayoutInfo.reducer
    }
})