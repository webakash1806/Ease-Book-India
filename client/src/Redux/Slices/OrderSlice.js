import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    carsOrderData: localStorage.getItem('carsOrderData') !== "undefined" ? JSON.parse(localStorage.getItem('carsOrderData')) : [],
    boatOrderData: localStorage.getItem('boatOrderData') !== "undefined" ? JSON.parse(localStorage.getItem('boatOrderData')) : [],
    priestOrderData: localStorage.getItem('priestOrderData') !== "undefined" ? JSON.parse(localStorage.getItem('priestOrderData')) : [],
    guiderOrderData: localStorage.getItem('guiderOrderData') !== "undefined" ? JSON.parse(localStorage.getItem('guiderOrderData')) : [],
    hotelOrderData: localStorage.getItem('hotelOrderData') !== "undefined" ? JSON.parse(localStorage.getItem('hotelOrderData')) : [],
    singleCarData: localStorage.getItem('singleCarData') !== "undefined" ? JSON.parse(localStorage.getItem('singleCarData')) : {},
    singleBoatData: localStorage.getItem('singleBoatData') !== "undefined" ? JSON.parse(localStorage.getItem('singleBoatData')) : {},
    singlePriestData: localStorage.getItem('singlePriestData') !== "undefined" ? JSON.parse(localStorage.getItem('singlePriestData')) : {},
    singleGuiderData: localStorage.getItem('singleGuiderData') !== "undefined" ? JSON.parse(localStorage.getItem('singleGuiderData')) : {},
    singleHotelData: localStorage.getItem('singleHotelData') !== "undefined" ? JSON.parse(localStorage.getItem('singleHotelData')) : {},

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

export const bookPriest = createAsyncThunk('/user/book-priest', async (data) => {
    try {
        let res = axiosInstance.post('user/book-priest', data)
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

export const getPriestOrders = createAsyncThunk('/user/get-priest-order/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/get-priest-order/${data}`)
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

export const getPriestOrderDetail = createAsyncThunk('/user/priest-book-detail/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/priest-book-detail/${data}`)
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

export const poojaFinishUpdate = createAsyncThunk('/user/update-pooja-finish', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/update-pooja-complete`, data)
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

export const cancelPoojaBooking = createAsyncThunk('/user/cancel-pooja-booking', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/priest-book-cancel/${data}`)
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

export const bookGuider = createAsyncThunk('/user/book-guider', async (data) => {
    try {
        let res = axiosInstance.post('user/book-guider', data)
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

export const getGuiderOrders = createAsyncThunk('/user/get-guider-order/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/get-guider-order/${data}`)
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

export const getGuiderOrderDetail = createAsyncThunk('/user/guider-book-detail/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/guider-book-detail/${data}`)
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

export const guideFinishUpdate = createAsyncThunk('/user/update-guide-finish', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/update-guide-complete`, data)
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

export const cancelGuideBooking = createAsyncThunk('/user/cancel-guide-booking', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/guider-book-cancel/${data}`)
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

export const bookHotel = createAsyncThunk('/user/book-hotel', async (data) => {
    try {
        let res = axiosInstance.post('user/book-hotel', data)
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

export const getHotelOrders = createAsyncThunk('/user/get-hotel-order/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/get-hotel-order/${data}`)
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

export const getHotelOrderDetail = createAsyncThunk('/user/hotel-book-detail/:id', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.get(`user/hotel-book-detail/${data}`)
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

export const checkOutUpdate = createAsyncThunk('/user/update-check-out', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/update-check-out`, data)
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

export const cancelHotelBooking = createAsyncThunk('/user/cancel-hotel-booking', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`user/hotel-book-cancel/${data}`)
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
        }).addCase(getPriestOrders.fulfilled, (state, action) => {
            localStorage.setItem('priestOrderData', JSON.stringify(action?.payload?.order))
            state.priestOrderData = action?.payload?.order
        }).addCase(getPriestOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singlePriestData', JSON.stringify(action?.payload?.order))
            state.singlePriestData = action?.payload?.order
        }).addCase(getGuiderOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleGuiderData', JSON.stringify(action?.payload?.order))
            state.singleGuiderData = action?.payload?.order
        }).addCase(getGuiderOrders.fulfilled, (state, action) => {
            localStorage.setItem('guiderOrderData', JSON.stringify(action?.payload?.order))
            state.guiderOrderData = action?.payload?.order
        }).addCase(getHotelOrderDetail.fulfilled, (state, action) => {
            localStorage.setItem('singleHotelData', JSON.stringify(action?.payload?.order))
            state.singleHotelData = action?.payload?.order
        }).addCase(getHotelOrders.fulfilled, (state, action) => {
            localStorage.setItem('hotelOrderData', JSON.stringify(action?.payload?.order))
            state.hotelOrderData = action?.payload?.order
        })
    }
})

// export const {} = authSlice.actions
export default orderSlice.reducer