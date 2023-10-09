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
        }
    }
});

export const {incrementQty,decrementQuantityProduct,getProducts} = ProductSlice.actions;

export default ProductSlice.reducer;