import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    carsOrderData: localStorage.getItem('carsOrderData') !== "undefined" ? JSON.parse(localStorage.getItem('carsOrderData')) : {},
}

export const bookCar = createAsyncThunk('/user/book-car', async (data) => {
    try {
        let res = axiosInstance.post('user/book-car', data)
        toast.promise(res, {
            loading: 'Booking',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to book"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getOrders = createAsyncThunk('/user/get-car-order/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/get-car-order/${data}`)
        toast.promise(res, {
            loading: 'Loading',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to get orders"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateDrop = createAsyncThunk('/user/update-drop', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/update-drop`, data)
        toast.promise(res, {
            loading: 'Verifying',
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to get verified"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            localStorage.setItem('carsOrderData', JSON.stringify(action?.payload?.order))
            state.carsOrderData = action?.payload?.order
        })
    }
})

// export const {} = authSlice.actions
export default orderSlice.reducer