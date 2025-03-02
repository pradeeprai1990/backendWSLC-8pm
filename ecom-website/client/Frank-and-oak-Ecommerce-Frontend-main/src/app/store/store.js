import { configureStore } from '@reduxjs/toolkit'

import userSlice from '../slice/userSlice'
import  cartSlice  from '../slice/cartSlice'
export const store = configureStore({
    reducer: {
      userStore: userSlice,
      cartStore:cartSlice
    },
  })