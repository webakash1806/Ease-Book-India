import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './Slices/AuthSlice'
import listSliceReducer from './Slices/ListSlice'
import statsSliceReducer from './Slices/StatsSlice'
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        list: listSliceReducer,
        stats: statsSliceReducer
    },
    devTools: true
})

export default store