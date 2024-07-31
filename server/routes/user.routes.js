// Importing the Router from Express to create modular route handlers
import { Router } from "express";

// Importing various controller functions and middlewares
import {
    register,
    login,
    logout,
    profile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile
} from "../controllers/user.controller.js";

import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { loginAuth } from "../middlewares/login.middleware.js";
import upload from '../middlewares/multer.middleware.js'
import { getDriverWithService } from "../controllers/cars.controller.js";
import { cancelCarBook, createCarOrder, dropUpdate, getCarOrderData, getUserCarOrder } from "../controllers/bookings/carOrder.controller.js";
import { getBoatmanWithService } from "../controllers/boat.controller.js";
import { cancelBoatBook, createBoatOrder, dropBoatUpdate, getBoatOrderData, getUserBoatOrder } from "../controllers/bookings/boatOrder.controller.js";

// Creating an instance of the Express Router
const router = Router()

// Route for user registration with optional avatar upload using multer middleware
router.post('/register', upload.single("avatar"), register)

// Route for user login with authentication middleware (loginAuth)
router.post('/login', loginAuth, login)

// Route for user logout
router.get('/logout', logout)

// Route to get user profile information, requires user to be logged in (isLoggedIn)
router.get('/me', isLoggedIn, profile)

// Route for initiating the forgot password process
router.post('/forgot-password', forgotPassword)

// Route for resetting the user's password with a reset token
router.post('/reset-password/:resetToken', resetPassword)

// Route for changing the user's password, requires user to be logged in
router.post('/change-password', isLoggedIn, changePassword)

// Route for updating user profile information with optional avatar upload
router.put('/update-profile/:id', isLoggedIn, upload.single("avatar"), updateProfile)


router.get('/cars-list', getDriverWithService)

router.get('/boat-list', getBoatmanWithService)

router.post('/book-car', isLoggedIn, createCarOrder)

router.post('/book-boat', isLoggedIn, createBoatOrder)

router.get('/get-car-order/:id', isLoggedIn, getUserCarOrder)

router.get('/get-boat-order/:id', isLoggedIn, getUserBoatOrder)

router.put('/update-car-drop', isLoggedIn, dropUpdate)

router.put('/update-boat-drop', isLoggedIn, dropBoatUpdate)

router.get('/car-book-detail/:id', isLoggedIn, getCarOrderData)

router.get('/boat-book-detail/:id', isLoggedIn, getBoatOrderData)

router.put('/car-book-cancel/:id', isLoggedIn, cancelCarBook)

router.put('/boat-book-cancel/:id', isLoggedIn, cancelBoatBook)

// Exporting the router instance to be used in the main application
export default router