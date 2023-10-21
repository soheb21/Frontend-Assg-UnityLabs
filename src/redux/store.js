import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./storeSlice"
export const store = configureStore({
    reducer: {
        allData: dataReducer,
    },
});