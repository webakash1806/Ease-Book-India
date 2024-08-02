import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    carsData: localStorage.getItem('carsData') !== "undefined" ? JSON.parse(localStorage.getItem('carsData')) : [],
    driverData: localStorage.getItem('driverData') !== "undefined" ? JSON.parse(localStorage.getItem('driverData')) : {},
    boatData: localStorage.getItem('boatData') !== "undefined" ? JSON.parse(localStorage.getItem('boatData')) : [],
    priestListData: localStorage.getItem('priestListData') !== "undefined" ? JSON.parse(localStorage.getItem('priestListData')) : [],
    boatmanData: localStorage.getItem('boatmanData') !== "undefined" ? JSON.parse(localStorage.getItem('boatmanData')) : {},
    priestData: localStorage.getItem('priestData') !== "undefined" ? JSON.parse(localStorage.getItem('priestData')) : {},
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

export const getBoatList = createAsyncThunk('/user/boat-list', async () => {
    try {
        let res = axiosInstance.get('user/boat-list')
        toast.promise(res, {
            loading: 'Loading boat list',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const getBoatmanData = createAsyncThunk('/user/boat-order', async (data) => {
    try {
        let res = axiosInstance.get(`admin/boat/detail/${data}`)
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

export const getPriestList = createAsyncThunk('/user/priest-list', async () => {
    try {
        let res = axiosInstance.get('user/priest-list')
        toast.promise(res, {
            loading: 'Loading priest list',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to load"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const getPriestData = createAsyncThunk('/user/priest-order', async (data) => {
    try {
        let res = axiosInstance.get(`admin/priest/detail/${data}`)
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
        }).addCase(getBoatList.fulfilled, (state, action) => {
            localStorage.setItem('boatData', JSON.stringify(action?.payload?.filteredDrivers))
            state.boatData = action?.payload?.filteredDrivers
        }).addCase(getBoatmanData.fulfilled, (state, action) => {
            localStorage.setItem('boatmanData', JSON.stringify(action?.payload?.detail))
            state.boatmanData = action?.payload?.detail
        }).addCase(getPriestList.fulfilled, (state, action) => {
            console.log(action)
            localStorage.setItem('priestListData', JSON.stringify(action?.payload?.filteredPriest))
            state.priestListData = action?.payload?.filteredPriest
        }).addCase(getPriestData.fulfilled, (state, action) => {
            localStorage.setItem('priestData', JSON.stringify(action?.payload?.detail))
            state.priestData = action?.payload?.detail
        })
    }
})

// export const {} = authSlice.actions
export default serviceSlice.reducer