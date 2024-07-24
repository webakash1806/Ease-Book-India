import Admin from "../models/admin.model.js"
import AppError from "../utils/error.utils.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
import bcrypt from 'bcryptjs'
import sendEmail from "../utils/sendEmail.js"
import crypto from 'crypto'

/* The below code is defining an object called `cookieOption` with properties that specify options for
a cookie. */
const cookieOption = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'None',
}

/**
 * The `register` function is an asynchronous function that handles the registration process for a
 * admin, including validation, creating a new admin in the database, and generating a JWT token for
 * authentication.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `req.body` (the request body),
 * `req.params` (the route parameters), `req.query` (the query parameters), and more.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send the
 * response back to the client.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used to handle errors or to move
 * on to the next middleware function after completing a specific task.
 * @returns a response to the client. If the registration is successful, it returns a JSON object with
 * a success message and the registered admin's details. If there are any errors during the registration
 * process, it returns an error message.
 */
const register = async (req, res, next) => {

    try {
        // Extracting admin input from request body
        const { fullName, email, password, confirmPassword, phoneNumber } = req.body

        // Validating required fields
        if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
            return next(new AppError('All Fields are required', 400))
        }

        // Checking if the email is already registered
        const uniqueEmail = await Admin.findOne({ email })
        if (uniqueEmail) {
            return next(new AppError('Email is already registered', 400))
        }

        const uniquePhoneNumber = await Admin.findOne({ phoneNumber })

        if (uniquePhoneNumber) {
            return next(new AppError('Phone number is already registered', 400))
        }

        // Creating a new admin in the database
        const admin = await Admin.create({
            fullName,
            email,
            phoneNumber,
            password,
            confirmPassword,
        })

        if (!admin) {
            return next(new AppError('Registration Failed!', 400))
        }

        // Saving admin details and sending response to the client
        if (password === confirmPassword) {
            await admin.save()
            admin.password = undefined
            admin.confirmPassword = undefined
            res.status(201).json({
                success: true,
                message: 'Admin registered Successfully',
                admin
            })
        }
        else {
            return next(new AppError('Password and Confirm Password must be same', 400))
        }

    } catch (err) {
        // Handling any unexpected errors
        return next(new AppError(err.message, 500))
    }

}

/**
 * The login function is an asynchronous function that handles the login process by checking the email
 * and password provided, finding the admin with the given email, comparing the password, generating a
 * JWT token, setting the token as a cookie, and returning a success response with the admin
 * information.
 * @returns The login function returns a JSON response with the following properties:
 * - success: a boolean value indicating whether the login was successful or not
 * - message: a string message indicating the result of the login attempt
 * - admin: an object representing the admin who logged in
 */
const login = async (req, res, next) => {
    try {
        // Extracting admin input from request body
        const { email, password } = req.body

        // Validating required fields
        if (!email || !password) {
            return next(new AppError('Email and Password is required', 400))
        }

        // Finding the admin with the provided email and selecting the password field
        const admin = await Admin.findOne({
            email
        }).select('+password')

        // Handling scenarios where the admin is not found or the password is incorrect
        if (!admin) {
            return next(new AppError('Email is not registered', 401))
        }

        const passwordCheck = await admin.comparePassword(password)
        if (!passwordCheck) {
            return next(new AppError('Password is wrong', 400))
        }

        // Generating JWT token and setting it as a cookie
        const token = await admin.generateJWTToken()
        res.cookie('token', token, cookieOption)

        // Sending success response to the client
        res.status(200).json({
            success: true,
            message: 'Login Successfull!',
            admin
        })

    }
    catch (err) {
        // Handling any unexpected errors
        return next(new AppError(err.message, 500))
    }

}

/**
 * The `logout` function logs out a admin by clearing the token cookie and returning a success message.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the headers, query parameters, and body.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to manipulate the response, set
 * headers, and send data back to the client. In this case, it is used to set a cookie and send a JSON
 * @returns a response object with a status code and a JSON object containing the success status and a
 * message.
 */
const logout = (req, res) => {
    // Clearing the token cookie
    const token = ""
    const cookiesOption = {
        logoutAt: new Date(), httpOnly: true, secure: true,
        sameSite: 'None',
    }

    // Logging out the admin and sending success response
    try {
        res.cookie("token", token, cookiesOption)
        res.status(200).json({ success: true, message: "Logged out" })
    }
    catch (e) {
        // Handling any unexpected errors
        return res.status(500).json({ success: false, message: e.message })
    }
}

/**
 * The profile function fetches admin details and sends a JSON response with the admin object.
 * @returns a JSON response with the admin details if the operation is successful. If there is an error,
 * it is returning an error message with a status code of 500.
 */
const profile = async (req, res, next) => {
    try {
        // Extracting admin ID from the request
        const userId = req.admin.id

        // Finding the admin by ID
        const admin = await Admin.findById(userId)

        // Sending admin details as a JSON response
        res.status(200).json({
            success: true,
            message: "Admin Details",
            admin
        })
    }
    catch (err) {
        // Handling any unexpected errors
        return next(new AppError("Failed to fetch" + err.message, 500))
    }
}

/**
 * The `forgotPassword` function is an asynchronous function that handles the logic for generating a
 * password reset token, sending an email with the reset link, and handling any errors that may occur.
 * @returns a JSON response with a success message if the email is valid and the password reset link
 * has been sent successfully. If there is an error in sending the email, it returns an error message.
 */
const forgotPassword = async (req, res, next) => {
    const { email } = req.body
    if (!email) {
        return next(new AppError("Email is Required", 400))
    }

    // Finding the admin with the provided email
    const admin = await Admin.findOne({ email })

    // Handling scenarios where the admin is not found
    if (!admin) {
        return next(new AppError("Email is not registered", 400))
    }

    // Generating a password reset token and saving it in the admin document
    const resetToken = await admin.generatePasswordResetToken()
    await admin.save()

    // Constructing the reset password URL and sending an email with the reset link
    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    const subject = 'Reset Password'
    const message = `Reset your Password by clicking on this link <a href=${resetPasswordURL}>Reset Password</a>`


    try {
        await sendEmail(email, subject, message)

        // Sending success response to the client
        res.status(200).json({
            success: true,
            message: 'Password reset link has been sent to your email'
        })


    } catch (e) {
        // Handling errors and cleaning up the admin document in case of failure
        admin.forgetPasswordExpiry = undefined
        admin.forgetPasswordToken = undefined

        await admin.save()
        return next(new AppError(e.message, 500))
    }

}

/**
 * The `resetPassword` function is an asynchronous function that handles the logic for resetting a
 * admin's password using a reset token and a new password.
 * @returns a JSON response with a success status and a message indicating that the password reset was
 * successful.
 */
const resetPassword = async (req, res, next) => {
    try {
        // Extracting reset token and new password from request parameters and body
        const { resetToken } = req.params
        const { password } = req.body

        // Hashing the reset token to compare with the stored token in the database
        const forgetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        // Finding the admin by the hashed reset token and ensuring the token hasn't expired
        const admin = await Admin.findOne({
            forgetPasswordToken,
            forgetPasswordExpiry: { $gt: Date.now() }
        })

        // Handling scenarios where the admin is not found or the token is invalid/expired
        if (!admin) {
            return next(new AppError('Token is Invalid or expired! please resend it', 400))
        }

        // Handling scenario where the new password is not provided
        if (!password) {
            return next(new AppError('Please Enter new Password', 400))
        }

        // Updating admin's password, clearing reset token, and expiry
        admin.password = await bcrypt.hash(password, 10)
        admin.forgetPasswordToken = undefined
        admin.forgetPasswordExpiry = undefined

        // Saving the updated admin document
        await admin.save()

        // Sending success response to the client
        res.status(200).json({
            success: true,
            message: 'Password reset successfull'
        })
    } catch (e) {
        // Handling any unexpected errors
        return next(new AppError(e.message, 500))
    }

}

/**
 * The `changePassword` function is an asynchronous function that handles the logic for changing a
 * admin's password.
 * @returns a JSON response with a status of 200 and a message indicating that the password has been
 * changed successfully.
 */
const changePassword = async (req, res, next) => {
    try {
        // Extracting old and new passwords from the request body and admin ID from request admin
        const { oldPassword, newPassword } = req.body
        const { id } = req.admin

        // Validating required fields
        if (!oldPassword || !newPassword) {
            return next(new AppError('All fields are required', 400))
        }

        // Ensuring the new password is different from the old password
        if (oldPassword === newPassword) {
            return next(new AppError('New password is same as old password', 400))
        }

        // Finding the admin by ID and selecting the password field
        const admin = await Admin.findById(id).select('+password')

        // Handling scenarios where the admin is not found
        if (!admin) {
            return next(new AppError('Admin does not exist', 400))
        }

        // Validating the old password
        const passwordValid = await admin.comparePassword(oldPassword)

        // Handling scenarios where the old password is incorrect
        if (!passwordValid) {
            return next(new AppError('Old Password is wrong', 400))
        }

        // Updating admin's password and saving the updated admin document
        admin.password = await bcrypt.hash(newPassword, 10)
        await admin.save()

        // Removing sensitive information before sending the response
        admin.password = undefined

        // Sending success response to the client
        res.status(200).json({
            status: true,
            message: 'Password Changed successfully'
        })
    }
    catch (e) {
        // Handling any unexpected errors
        return next(new AppError(e.message, 500))
    }

}

/**
 * The `updateProfile` function is an asynchronous function that updates the admin's profile
 * information, including their full name and avatar image.
 * @returns a JSON response with a success status and a message indicating that the admin detail has
 * been updated successfully.
 */
const updateProfile = async (req, res, next) => {
    try {
        // Extracting full name and admin ID from the request body and admin
        const { fullName, phoneNumber } = req.body
        const { id } = req.admin

        // Finding the admin by ID
        const admin = await Admin.findById(id)

        // Handling scenarios where the admin is not found
        if (!admin) {
            return next(new AppError('Admin does not exist', 400))
        }

        // Updating admin's full name if provided
        if (fullName) {
            admin.fullName = await fullName
        }

        if (phoneNumber) {
            admin.phoneNumber = await phoneNumber
        }

        // Handling avatar upload using cloudinary if a file is present in the request
        if (req.file) {
            // Destroying the previous avatar in cloudinary
            await cloudinary.v2.uploader.destroy(admin.avatar.publicId)
            try {
                // Uploading the new avatar to cloudinary
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crop: 'fill',
                })
                // Updating admin's avatar information
                if (result) {
                    admin.avatar.publicId = result.public_id
                    admin.avatar.secure_url = result.secure_url

                    // Removing the temporary file after avatar upload
                    fs.rm(`uploads/${req.file.filename}`)
                }
            }
            catch (err) {
                // Handling errors during avatar upload
                return next(new AppError('File can not get uploaded', 500))
            }
        }

        // Saving the updated admin document
        await admin.save()

        // Sending success response to the client
        res.status(200).json({
            success: true,
            message: 'Admin Detail updated successfully'
        })
    }
    catch (e) {
        // Handling any unexpected errors
        return next(new AppError(e.message, 500))
    }

}

/* The below code is exporting a set of functions related to admin authentication and profile
management. These functions include: */
export {
    register,
    login,
    logout,
    profile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile
}