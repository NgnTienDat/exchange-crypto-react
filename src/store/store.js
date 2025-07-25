import { configureStore } from "@reduxjs/toolkit";
import marketDataReducer from './marketDataSlice';

export const store = configureStore({
    reducer: {
        marketData: marketDataReducer
    }
})

