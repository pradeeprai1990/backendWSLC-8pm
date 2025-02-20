import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";
export let userSlice=createSlice({
    name:"login",
    initialState:{
        userDetails:Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null
    },
    reducers:{
        saveLoginDetails:(state,reqData)=>{
            state.userDetails=reqData.payload.user
            Cookies.set("user",JSON.stringify(reqData.payload.user))
        },
        logOut:(state)=>{
            state.userDetails=null
            Cookies.remove('user')
        }
    }
})

export const { saveLoginDetails, logOut } = userSlice.actions

export default userSlice.reducer