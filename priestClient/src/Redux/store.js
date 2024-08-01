import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import orderSliceReducer from './Slices/OrderSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        order: orderSliceReducer

    },
    devTools: true
})

export default store