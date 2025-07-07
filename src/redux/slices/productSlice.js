import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async ()=>{
    const result = await axios.get("https://dummyjson.com/products") 
    sessionStorage.setItem("allProducts",JSON.stringify(result.data.products))
    // console.log(result.data.products);  
    return result.data.products
})

const productSlice = createSlice({
    name:'products',
    initialState:{
        allProducts: [],
        dummyAllProducts:[],
        loading: false,
        errorMsg: "",
    },
    reducers:{
        searchProduct: (state,actionFromHeader)=>{
            state.allProducts = state.dummyAllProducts.filter(item=>item.title.toLowerCase().includes(actionFromHeader.payload))
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,apiResult)=>{
            state.allProducts = apiResult.payload
            state.dummyAllProducts = apiResult.payload
            state.loading = false
            state.errorMsg = ""
        })
        builder.addCase(fetchProducts.pending,(state,apiresult)=>{
            state.allProducts = []
            state.dummyAllProducts = []
            state.loading = true
            state.errorMsg = ""
        })
        builder.addCase(fetchProducts.rejected,(state,apiresult)=>{
            state.allProducts = []
            state.dummyAllProducts = []
            state.loading = false
            state.errorMsg = "Api call failed"
        })
    }

})

export const {searchProduct} = productSlice.actions
export default productSlice.reducer