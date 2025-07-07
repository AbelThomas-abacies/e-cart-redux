import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: 'wishlists',
    initialState: [],
    reducers: {
        addToWishlist: (state,actionFromView)=>{
            state.push(actionFromView.payload)
        },
        removeItem: (state,actionFromwishlist)=>{
          return state.filter(item=>item.id!=actionFromwishlist.payload)
        }
    }
})

export const {addToWishlist,removeItem} = wishlistSlice.actions
export default wishlistSlice.reducer