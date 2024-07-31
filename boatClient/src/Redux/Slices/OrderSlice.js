import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    orderData: localStorage.getItem('orderData') !== "undefined" ? JSON.parse(localStorage.getItem('orderData')) : [{}],
    singleBoatData: localStorage.getItem('singleBoatData') !== "undefined" ? JSON.parse(localStorage.getItem('singleBoatData')) : {},
}

export const getOrders = createAsyncThunk('/cars/get-order/:id', async (data) => {
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


export const getBoatOrderDetail = createAsyncThunk('/boat/boat-book-detail/:id', async (data) => {
    try {
        let res = axiosInstance.get(`boat-book-detail/${data}`)
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

export const updateBoatDrop = createAsyncThunk('/boat/update-boat-drop', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`update-boat-drop`, data)
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
            console.log(action)
            localStorage.setItem('orderData', JSON.stringify(action?.payload?.order))
            state.orderData = action?.payload?.order
        }).addCase(getBoatOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleBoatData', JSON.stringify(action?.payload?.order))
            state.singleBoatData = action?.payload?.order
        })
    }
})

// export const {} = authSlice.actions
export default orderSlice.reducer