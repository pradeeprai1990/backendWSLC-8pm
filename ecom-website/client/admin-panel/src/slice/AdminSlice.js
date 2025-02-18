import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";
export let loginSlice=createSlice({
    name:"login",
    initialState:{
        adminDetails:Cookies.get("admin") ? JSON.parse(Cookies.get("admin")) : null
    },
    reducers:{
        saveLoginDetails:(state,reqData)=>{
            state.adminDetails=reqData.payload.admin
            Cookies.set("admin",JSON.stringify(reqData.payload.admin))
        },
        logOut:(state)=>{
            state.adminDetails=null
            Cookies.remove('admin')
        }
    }
})

export const { saveLoginDetails, logOut } = loginSlice.actions

export default loginSlice.reducer