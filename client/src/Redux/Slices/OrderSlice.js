import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    carsOrderData: localStorage.getItem('carsOrderData') !== "undefined" ? JSON.parse(localStorage.getItem('carsOrderData')) : [],
    boatOrderData: localStorage.getItem('boatOrderData') !== "undefined" ? JSON.parse(localStorage.getItem('boatOrderData')) : [],
    singleCarData: localStorage.getItem('singleCarData') !== "undefined" ? JSON.parse(localStorage.getItem('singleCarData')) : {},
    singleBoatData: localStorage.getItem('singleBoatData') !== "undefined" ? JSON.parse(localStorage.getItem('singleBoatData')) : {},

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

export const getCarOrderDetail = createAsyncThunk('/user/car-book-detail/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/car-book-detail/${data}`)
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
        let res = axiosInstance.put(`user/update-car-drop`, data)
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

export const cancelBooking = createAsyncThunk('/user/cancel-booking', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/car-book-cancel/${data}`)
        toast.promise(res, {
            loading: 'Cancelling',
            success: (data) => {
                return data?.order.message
            },
            error: "Failed to get cancel"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const bookBoat = createAsyncThunk('/user/book-boat', async (data) => {
    try {
        let res = axiosInstance.post('user/book-boat', data)
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

export const getBoatOrders = createAsyncThunk('/user/get-boat-order/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/get-boat-order/${data}`)
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

export const getBoatOrderDetail = createAsyncThunk('/user/boat-book-detail/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/boat-book-detail/${data}`)
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

export const cancelBoatBooking = createAsyncThunk('/user/cancel-boat-booking', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/boat-book-cancel/${data}`)
        toast.promise(res, {
            loading: 'Cancelling',
            success: (data) => {
                return data?.order.message
            },
            error: "Failed to get cancel"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateBoatDrop = createAsyncThunk('/user/update-boat-drop', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/update-boat-drop`, data)
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

export const updateBoatPickup = createAsyncThunk('/user/update-boat-drop', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/update-boat-pick`, data)
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
        }).addCase(getCarOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleCarData', JSON.stringify(action?.payload?.order))
            state.singleCarData = action?.payload?.order
        }).addCase(getBoatOrders.fulfilled, (state, action) => {
            localStorage.setItem('boatOrderData', JSON.stringify(action?.payload?.order))
            state.boatOrderData = action?.payload?.order
        }).addCase(getBoatOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleBoatData', JSON.stringify(action?.payload?.order))
            state.singleBoatData = action?.payload?.order
        })
    }
})

// export const {} = authSlice.actions
export default orderSlice.reducer