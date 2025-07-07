import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cartItems',
    initialState: [],
    reducers: {
        addToCart:(state,actionByComponent)=>{
        const existingProduct = state.find(item=>item.id==actionByComponent.payload.id)
        if(existingProduct){
            existingProduct.quantity++
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price
            const remainingProducts = state.filter(item=>item.id!=existingProduct.id)
            state = [...remainingProducts,existingProduct]
        }else{
            state.push({...actionByComponent.payload,quantity:1,totalPrice:actionByComponent.payload.price})
        }
        },
        incrementQuantity : (state, actionByCart)=>{
            const existingProducts = state.find(item=>item.id == actionByCart.payload)
            existingProducts.quantity++
            existingProducts.totalPrice = existingProducts.quantity * existingProducts.price
            const remainingProducts = state.filter(item=> item.id !== existingProducts.id)
            state = [...remainingProducts,existingProducts]
        },
        decrementQuantity : (state, actionByCart)=>{
            const existingProducts = state.find(item=>item.id == actionByCart.payload)
            if(existingProducts.quantity>1){
                existingProducts.quantity--
            }else{
                return state.filter(item=>item.id!=actionByCart.payload)
            }
            existingProducts.totalPrice = existingProducts.quantity * existingProducts.price
            const remainingProducts = state.filter(item=> item.id !== existingProducts.id)
            state = [...remainingProducts,existingProducts]
        },
        removeCartItem: (state, actionByCart)=>{
            return state.filter(item=>item.id!=actionByCart.payload)
        },
        emptyCart: (state)=>{
            return state = []
        }   
     }
})

export const {addToCart,incrementQuantity,decrementQuantity,removeCartItem,emptyCart} = cartSlice.actions
export default cartSlice.reducer