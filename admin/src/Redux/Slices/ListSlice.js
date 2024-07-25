import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from "../../Helper/axiosInstance"


const initialState = {
    driverList: localStorage.getItem('driverList') !== "undefined" ? JSON.parse(localStorage.getItem('driverList')) : {}
}

export const getDriverList = createAsyncThunk('/admin/car/list', async () => {
    try {
        let res = axiosInstance.get('/car/list')
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        res = await res
        return res.data
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateDriverStatus = createAsyncThunk('/admin/car/status-update', async (data) => {
    try {
        let res = axiosInstance.put('/car/update-status', data)
        toast.promise(res, {
            loading: 'Loading data',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })

        res = await res
        return res.data

    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})


const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDriverList.fulfilled, (state, action) => {
            localStorage.setItem('driverList', JSON.stringify(action?.payload?.list))
            state.driverList = action?.payload?.list
        })
    }
})


export default listSlice.reducer