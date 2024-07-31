import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from "../../Helper/axiosInstance"


const initialState = {
    driverList: localStorage.getItem('driverList') !== "undefined" ? JSON.parse(localStorage.getItem('driverList')) : [{}],
    carsBooking: localStorage.getItem('carsBooking') !== "undefined" ? JSON.parse(localStorage.getItem('carsBooking')) : [{}],
    boatBooking: localStorage.getItem('boatBooking') !== "undefined" ? JSON.parse(localStorage.getItem('boatBooking')) : [{}],
    userList: localStorage.getItem('userList') !== "undefined" ? JSON.parse(localStorage.getItem('userList')) : [{}],
    boatManList: localStorage.getItem('boatManList') !== "undefined" ? JSON.parse(localStorage.getItem('boatManList')) : [{}],
    driverDetail: localStorage.getItem('driverDetail') !== "undefined" ? JSON.parse(localStorage.getItem('driverDetail')) : {},
    boatmanDetail: localStorage.getItem('boatmanDetail') !== "undefined" ? JSON.parse(localStorage.getItem('boatmanDetail')) : {},
    singleCarData: localStorage.getItem('singleCarData') !== "undefined" ? JSON.parse(localStorage.getItem('singleCarData')) : {},
    singleBoatData: localStorage.getItem('singleBoatData') !== "undefined" ? JSON.parse(localStorage.getItem('singleBoatData')) : {},
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

export const getCarOrderDetail = createAsyncThunk('/admin/car-book/:id', async (data) => {
    try {
        let res = axiosInstance.get(`car-orders/${data}`)
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

export const getBoatmanList = createAsyncThunk('/admin/boat/list', async () => {
    try {
        let res = axiosInstance.get('/boat/list')
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

export const updateBoatmanStatus = createAsyncThunk('/admin/boat/status-update', async (data) => {
    try {
        let res = axiosInstance.put('/boat/update-status', data)
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

export const getBoatmanDetail = createAsyncThunk('/admin/boat/detail', async (data) => {
    try {
        console.log(`/boat/detail/${data}`)
        let res = axiosInstance.get(`/boat/detail/${data}`)
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

export const getBoatBookings = createAsyncThunk('/admin/boat/booking', async () => {
    try {
        let res = axiosInstance.get('/boat-orders')
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

export const getBoatOrderDetail = createAsyncThunk('/admin/boat-book/:id', async (data) => {
    try {
        let res = axiosInstance.get(`boat-orders/${data}`)
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
        }).addCase(getCarOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleCarData', JSON.stringify(action?.payload?.order))
            state.singleCarData = action?.payload?.order
        }).addCase(getBoatmanList.fulfilled, (state, action) => {
            localStorage.setItem('boatManList', JSON.stringify(action?.payload?.list))
            state.boatManList = action?.payload?.list
        }).addCase(getBoatmanDetail.fulfilled, (state, action) => {
            localStorage.setItem('boatmanDetail', JSON.stringify(action?.payload?.detail))
            state.boatmanDetail = action?.payload?.detail
        }).addCase(getBoatBookings.fulfilled, (state, action) => {
            localStorage.setItem('boatBooking', JSON.stringify(action?.payload?.order))
            state.boatBooking = action?.payload?.order
        }).addCase(getBoatOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleBoatData', JSON.stringify(action?.payload?.order))
            state.singleBoatData = action?.payload?.order
        })
    }
})


export default listSlice.reducer