import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from "../../Helper/axiosInstance"


const initialState = {
    driverList: localStorage.getItem('driverList') !== "undefined" ? JSON.parse(localStorage.getItem('driverList')) : [{}],
    carsBooking: localStorage.getItem('carsBooking') !== "undefined" ? JSON.parse(localStorage.getItem('carsBooking')) : [{}],
    userList: localStorage.getItem('userList') !== "undefined" ? JSON.parse(localStorage.getItem('userList')) : [{}],
    driverDetail: localStorage.getItem('driverDetail') !== "undefined" ? JSON.parse(localStorage.getItem('driverDetail')) : {}
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

export const getDriverDetail = createAsyncThunk('/admin/car/detail', async (data) => {
    try {
        console.log(`/car/detail/${data}`)
        let res = axiosInstance.get(`/car/detail/${data}`)
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

export const getUsersList = createAsyncThunk('/admin/user/list', async () => {
    try {
        let res = axiosInstance.get('/user/list')
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

export const getCarBookings = createAsyncThunk('/admin/car/booking', async () => {
    try {
        let res = axiosInstance.get('/car-orders')
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
        }).addCase(getDriverDetail.fulfilled, (state, action) => {
            localStorage.setItem('driverDetail', JSON.stringify(action?.payload?.detail))
            state.driverDetail = action?.payload?.detail
        }).addCase(getUsersList.fulfilled, (state, action) => {
            localStorage.setItem('userList', JSON.stringify(action?.payload?.list))
            state.userList = action?.payload?.list
        }).addCase(getCarBookings.fulfilled, (state, action) => {
            localStorage.setItem('carsBooking', JSON.stringify(action?.payload?.order))
            state.carsBooking = action?.payload?.order
        })
    }
})


export default listSlice.reducer