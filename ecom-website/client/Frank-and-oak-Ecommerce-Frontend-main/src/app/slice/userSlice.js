import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";
export let userSlice=createSlice({
    name:"login",
    initialState:{
        userDetails:Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
        token:Cookies.get("token") ?? ''
    },
    reducers:{
        saveLoginDetails:(state,reqData)=>{
            state.userDetails=reqData.payload.user
            state.token=reqData.payload.token
            Cookies.set("user",JSON.stringify(reqData.payload.user))
            Cookies.set("token",reqData.payload.token)
        },
        logOut:(state)=>{
            state.userDetails=null
            state.token=''
            Cookies.remove('user')
            Cookies.remove('token')
        }
    }
})

export const { saveLoginDetails, logOut } = userSlice.actions

export default userSlice.reducer