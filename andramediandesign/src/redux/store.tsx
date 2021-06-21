import { configureStore } from "@reduxjs/toolkit";

import buttonActionSlice from "./slices/buttonActionSlice";

const store = configureStore({
    reducer:{
        buttonActionState: buttonActionSlice
    }
})

export default store