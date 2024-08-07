import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !== "undefined" ? JSON.parse(localStorage.getItem('data')) : {},
    monthlyRevenue: {},
    totalRevenue: 0,
    monthlyBooking: {},
    totalBooking: 0,
}

export const createAccount = createAsyncThunk('/hotel/register', async (data) => {
    try {
        console.log(1)
        let res = axiosInstance.post('register', data)
        console.log(2)

        toast.promise(res, {
            loading: 'Creating Account',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to create account"
        })
        // getting response resolved here
        res = await res;
        console.log(3)
        return res.data;
    } catch (e) {
        console.log(4)
        return toast.error(e?.response?.data?.message)
    }

})

export const loginAccount = createAsyncThunk('/hotel/login', async (data) => {
    try {
        let res = axiosInstance.post('login', data)
        toast.promise(res, {
            loading: 'Wait! Logging in',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to login"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const logout = createAsyncThunk('/hotel/logout', async () => {
    try {
        let res = axiosInstance.get('logout')
        toast.promise(res, {
            loading: 'Wait! Logging out',
            success: (data) => {
                return data?.data.message
            },
            error: "failed to logout"
        })
        // getting response resolved here
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }

})

export const userProfile = createAsyncThunk('/hotel/details', async () => {
    try {
        const res = axiosInstance.get("me")
        return (await res).data
    } catch (e) {
        toast.error(e?.message)
    }
})

export const editProfile = createAsyncThunk('hotel/update-profile', async (data) => {
    try {
        let res = axiosInstance.put(`update-profile/${data[0]}`, data[1])
        toast.promise(res, {
            loading: "Updating Profile!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to update!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const changePassword = createAsyncThunk('hotel/update-password', async (data) => {
    try {
        let res = axiosInstance.post(`change-password`, data)
        toast.promise(res, {
            loading: "Changing Password!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to change password!"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const forgotPassword = createAsyncThunk('hotel/forgot-password', async (data) => {
    try {
        let res = axiosInstance.post(`forgot-password`, data)
        toast.promise(res, {
            loading: "Sending password reset link to registered mail!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to send reset link"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const resetPasswords = createAsyncThunk('hotel/reset-password', async (data) => {
    try {
        let res = axiosInstance.post(`reset-password/${data[0]}`, data[1])
        toast.promise(res, {
            loading: "Reseting Password!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to reset password"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const addServices = createAsyncThunk('/hotel/add-rooms', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`/add-rooms`, data)
        toast.promise(res, {
            loading: "Updating!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to update"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const updateServices = createAsyncThunk('/hotel/update-rooms', async (data) => {
    try {
        console.log(data)
        let res = axiosInstance.put(`/update-rooms`, data)
        toast.promise(res, {
            loading: "Updating!",
            success: (data) => {
                return data?.data.message
            },
            error: "Failed to update"
        })
        res = await res;
        return res.data;
    } catch (e) {
        return toast.error(e?.response?.data?.message)
    }
})

export const getTotalMonthlyRevenue = createAsyncThunk('/admin/stats/payment-monthly', async () => {
    try {
        const response = axiosInstance.get('/revenue')
        toast.promise(response, {
            loading: "Getting the stats",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load data"
        })

        return (await response).data
    } catch (e) {
        toast.error(e?.response?.data?.messages)
    }
})

export const getTotalMonthlyBooking = createAsyncThunk('/admin/stats/booking-monthly', async (data) => {
    try {
        const response = axiosInstance.get(`/stats/${data}`)
        toast.promise(response, {
            loading: "Getting the stats",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to load data"
        })

        return (await response).data
    } catch (e) {
        toast.error(e?.response?.data?.messages)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.hotel))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.hotel?.role)
            state.isLoggedIn = true
            state.data = action?.payload?.hotel
            state.role = action?.payload?.hotel?.role
        }).addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.hotel))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.hotel?.role)
            state.isLoggedIn = true
            state.data = action?.payload?.hotel
            state.role = action?.payload?.hotel?.role
        }).addCase(logout.fulfilled, (state) => {
            localStorage.clear()
            state.data = {}
            state.isLoggedIn = false
            state.role = ""
        }).addCase(userProfile.fulfilled, (state, action) => {
            console.log(action)
            localStorage.setItem('data', JSON.stringify(action?.payload?.hotel))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.hotel?.role)
            state.isLoggedIn = true
            state.data = action?.payload?.hotel
            state.role = action?.payload?.hotel?.role
        }).addCase(getTotalMonthlyRevenue.fulfilled, (state, action) => {
            state.monthlyRevenue = action?.payload?.monthlyPayments
            state.totalRevenue = action?.payload?.allPayments
        }).addCase(getTotalMonthlyBooking.fulfilled, (state, action) => {
            state.monthlyBooking = action?.payload?.monthlyHotelBookings
            state.totalBooking = action?.payload?.totalHotelBook
        })
    }
})

// export const {} = authSlice.actions
export default authSlice.reducer