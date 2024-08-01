import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    orderData: localStorage.getItem('orderData') !== "undefined" ? JSON.parse(localStorage.getItem('orderData')) : [{}],
    singleCarData: localStorage.getItem('singleCarData') !== "undefined" ? JSON.parse(localStorage.getItem('singleCarData')) : {},
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

export const updatePickup = createAsyncThunk('/cars/update-pickup', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`update-pickup`, data)
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

export const getCarOrderDetail = createAsyncThunk('/user/car-book-detail/:id', async (data) => {
    try {
        let res = axiosInstance.get(`car-book-detail/${data}`)
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
        }).addCase(getCarOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleCarData', JSON.stringify(action?.payload?.order))
            state.singleCarData = action?.payload?.order
        })
    }
})

// export const {} = authSlice.actions
export default orderSlice.reducer