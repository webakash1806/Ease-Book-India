import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import serviceSliceReducer from './Slices/ServiceSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        service: serviceSliceReducer

    },
    devTools: true
})

export default store