import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    orderData: localStorage.getItem('orderData') !== "undefined" ? JSON.parse(localStorage.getItem('orderData')) : [{}],
    singleHotelData: localStorage.getItem('singleHotelData') !== "undefined" ? JSON.parse(localStorage.getItem('singleHotelData')) : {},
}

export const getOrders = createAsyncThunk('/hotel/get-order/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`get-order/${data}`)
        toast.promise(res, {
            loading: 'Loading',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to get orders data"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateStatus = createAsyncThunk('/hotel/update-check-in', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`update-check-in`, data)
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

export const getHotelOrderDetail = createAsyncThunk('/hotel/book-detail/:id', async (data) => {
    try {
        let res = axiosInstance.get(`book-detail/${data}`)
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

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrders.fulfilled, (state, action) => {
            localStorage.setItem('orderData', JSON.stringify(action?.payload?.order))
            state.orderData = action?.payload?.order
        }).addCase(getHotelOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleHotelData', JSON.stringify(action?.payload?.order))
            state.singleHotelData = action?.payload?.order
        })
    }
})

// export const {} = authSlice.actions
export default orderSlice.reducer