import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import buttonActionSlice from "./redux/slices/buttonActionSlice";

const store = configureStore({
    reducer:{
        buttonAction: buttonActionSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store