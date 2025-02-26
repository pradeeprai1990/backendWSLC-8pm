import axios from "axios";
import Cookies from "js-cookie";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
// Thunk to fetch cart data

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkApi) => {
    try {
        const token = Cookies.get("token"); // Get token from cookies

        const response = await axios.get(`${process.env.NEXT_PUBLIC_APIURL}web/cart/get-cart`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach token to request headers
            },
        });

        return response.data; // Return API response
    } catch (error) {
        return thunkApi.rejectWithValue(error.message); // Handle error
    }
});





export let cartSlice= createSlice({
    name: "cart",
  
    initialState: {
        cartItems: [],
       
        
    },
   
    extraReducers: (builder) => {
        builder
          
          .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = action.payload;
            
          })
          
      },
})




export default cartSlice.reducer