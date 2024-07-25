import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import listSliceReducer from './Slices/ListSlice'
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        list: listSliceReducer
    },
    devTools: true
})

export default store