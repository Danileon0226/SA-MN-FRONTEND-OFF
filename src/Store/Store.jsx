import { configureStore } from "@reduxjs/toolkit";
import { conjuntosSlice, negocioInfo } from "./Slices";

export default configureStore({
    reducer: {
        Conjuntos: conjuntosSlice.reducer,
        negocioInfo: negocioInfo.reducer
    }
})