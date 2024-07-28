import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import serviceSliceReducer from './Slices/ServiceSlice'
import RazorpaySlice from './Slices/RazorpaySlice'
import OrderSlice from './Slices/OrderSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        service: serviceSliceReducer,
        razorpay: RazorpaySlice,
        order: OrderSlice
    },
    devTools: true
})

export default store