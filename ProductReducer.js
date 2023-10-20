import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice=createSlice({
    name:'product',
    initialState:{
        product:[]
    },
    reducers:{
        getProducts:(state,action)=>{
            state.product.push({...action.payload})
        },
        incrementQty:(state,action)=>{
            const itemPresent = state.product.find((item)=>item.id === action.payload.id);
            itemPresent.quantity++
        },
        decrementQuantityProduct:(state,action) => {
            const itemPresent = state.product.find((item) => item.id === action.payload.id);
            if(itemPresent.quantity == 1){
                itemPresent.quantity = 0;
               
            }else{
                itemPresent.quantity--;
            }
        },
       clearProduct:(state) => {
            state.product = state.product.forEach(product=>product.quantity = 0);
        }
    }
});

export const {incrementQty,decrementQuantityProduct,getProducts,clearProduct} = ProductSlice.actions;

export default ProductSlice.reducer;