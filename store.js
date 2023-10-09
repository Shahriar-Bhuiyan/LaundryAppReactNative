import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProudctReducer from './ProductReducer'


export default configureStore({
    reducer:{
        cart:CartReducer,
        product:ProudctReducer
    }
})