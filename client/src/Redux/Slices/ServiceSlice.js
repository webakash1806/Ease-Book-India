import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    carsData: localStorage.getItem('carsData') !== "undefined" ? JSON.parse(localStorage.getItem('carsData')) : {},
    driverData: localStorage.getItem('driverData') !== "undefined" ? JSON.parse(localStorage.getItem('driverData')) : {}
}

export const getCarsList = createAsyncThunk('/user/cars-list', async () => {
    try {
        let res = axiosInstance.get('user/cars-list')
        toast.promise(res, {
            loading: 'Creating Account',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to create account"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const getDriverData = createAsyncThunk('/user/cars-order', async (data) => {
    try {
        let res = axiosInstance.get(`admin/car/detail/${data}`)
        toast.promise(res, {
            // loading: '',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load data"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})



const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCarsList.fulfilled, (state, action) => {
            localStorage.setItem('carsData', JSON.stringify(action?.payload?.filteredDrivers))
            state.carsData = action?.payload?.filteredDrivers
        }).addCase(getDriverData.fulfilled, (state, action) => {
            localStorage.setItem('driverData', JSON.stringify(action?.payload?.detail))
            state.driverData = action?.payload?.detail
        })
    }
})

// export const {} = authSlice.actions
export default serviceSlice.reducer