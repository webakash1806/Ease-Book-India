import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axiosInstance from '../../Helper/axiosInstance'


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !== "undefined" ? JSON.parse(localStorage.getItem('data')) : {}
}

export const createAccount = createAsyncThunk('/cars/register', async (data) => {
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

export const loginAccount = createAsyncThunk('/cars/login', async (data) => {
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

export const logout = createAsyncThunk('/cars/logout', async () => {
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

export const userProfile = createAsyncThunk('/cars/details', async () => {
    try {
        const res = axiosInstance.get("me")
        return (await res).data
    } catch (e) {
        toast.error(e?.message)
    }
})

export const editProfile = createAsyncThunk('cars/update-profile', async (data) => {
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

export const changePassword = createAsyncThunk('cars/update-password', async (data) => {
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

export const forgotPassword = createAsyncThunk('cars/forgot-password', async (data) => {
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

export const resetPasswords = createAsyncThunk('cars/reset-password', async (data) => {
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.cars))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.cars?.role)
            state.isLoggedIn = true
            state.data = action?.payload?.cars
            state.role = action?.payload?.cars?.role
        }).addCase(createAccount.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.cars))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.cars?.role)
            state.isLoggedIn = true
            state.data = action?.payload?.cars
            state.role = action?.payload?.cars?.role
        }).addCase(logout.fulfilled, (state) => {
            localStorage.clear()
            state.data = {}
            state.isLoggedIn = false
            state.role = ""
        }).addCase(userProfile.fulfilled, (state, action) => {
            console.log(action)
            localStorage.setItem('data', JSON.stringify(action?.payload?.cars))
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('role', action?.payload?.cars?.role)
            state.isLoggedIn = true
            state.data = action?.payload?.cars
            state.role = action?.payload?.cars?.role
        })
    }
})

// export const {} = authSlice.actions
export default authSlice.reducer