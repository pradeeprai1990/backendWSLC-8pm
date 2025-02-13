import { configureStore } from '@reduxjs/toolkit'
import  loginSlice from '../slice/AdminSlice'
export const store = configureStore({
    reducer: {
      loginStore: loginSlice,
    },
  })