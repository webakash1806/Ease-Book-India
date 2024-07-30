import Order from '../../models/bookings/boatOrder.models.js'
import Boat from '../../models/boat.models.js'
import AppError from '../../utils/error.utils.js'
import otpGenerator from 'otp-generator'

const createBoatOrder = async (req, res, next) => {
    try {
        const { userId, boatId, orderDate, orderTime, fullName, area, originalPrice, totalPrice, fareType, phoneNumber, alternateNumber, numberOfMales, numberOfFemales, numberOfChildren, totalPerson } = req.body


        const boatman = await Boat.findOne({ _id: boatId })

        const remainingSeats = Number(boatman.servicesData.seatingCap) - totalPerson

        if (remainingSeats < 0) {
            return next(new AppError("No more seats", 400))
        }


        if (boatman.servicesData.availability !== "AVAILABLE") {
            return next(new AppError("Driver is busy Try another", 400))
        }

        const startOTP = await otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        console.log(startOTP)

        const dropOTP = await otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        console.log(dropOTP)

        // if (!originalPrice || !totalPrice || !pickLocation || !dropLocation || !phoneNumber || !alternateNumber || !fareType || !fullName || !returnTrip || !numberOfChildren || !numberOfFemales || !numberOfMales) {
        //     return next(new AppError('All fields are required', 400))
        // }

        if (!userId || !boatId || !orderDate || !orderTime || !startOTP || !dropOTP) {
            return next(new AppError('Something went wrong!', 400))
        }

        const driverData = await Boat.findOne({ _id: boatId })

        const order = await Order.create({
            driverData,
            userId,
            boatId,
            orderDate,
            orderTime,
            fullName,
            originalPrice,
            totalPrice,
            fareType,
            phoneNumber,
            alternateNumber,
            numberOfMales,
            numberOfFemales,
            numberOfChildren,
            startOTP,
            dropOTP,
            area
        })

        await order.save()

        if (fareType === "boat" && boatman.servicesData.seatingCap == 0) {
            boatman.servicesData.availability = "SEAT FULL"
        }

        boatman.servicesData.seatingCap = remainingSeats

        await boatman.save()

        res.status(200).json({
            success: true,
            message: "Booking successful",
            order
        })

    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const getCarOrderData = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        const order = await Order.findById(id)

        res.status(200).json({
            success: true,
            message: "Order details",
            order
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const getDriverCarOrder = async (req, res, next) => {
    try {
        const { id } = req.params

        const order = await Order.find({ boatId: id })

        res.status(200).json({
            success: true,
            message: "Your orders!",
            order
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const getUserCarOrder = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        const order = await Order.find({ userId: id })

        res.status(200).json({
            success: true,
            message: "Your orders!",
            order
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const allCarOrder = async (req, res, next) => {
    try {
        const order = await Order.find()

        res.status(200).json({
            success: true,
            message: "Order list",
            order
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const pickupUpdate = async (req, res, next) => {
    try {
        const { startOTP, id } = req.body
        console.log(startOTP, id)
        const order = await Order.findById(id)
        console.log(order)
        if (order.startOTP == startOTP) {
            order.status = "Picked up"
        } else {
            return next(new AppError("OTP is wrong!", 400))
        }

        await order.save()

        res.status(200).json({
            success: true,
            message: "Congratulation! Start your journey",
            order
        })

    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const dropUpdate = async (req, res, next) => {
    try {
        const { dropOTP, id } = req.body

        const order = await Order.findById(id)

        const boatId = order.boatId

        const boatman = await Boat.findOne({ _id: boatId })

        if (order.dropOTP == dropOTP) {
            order.status = "Dropped"
            boatman.servicesData.availability = "AVAILABLE"

            await boatman.save()
        } else {
            return next(new AppError("OTP is wrong!", 400))
        }

        await order.save()

        res.status(200).json({
            success: true,
            message: "Congratulation! ride completed",
            order
        })

    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const cancelCarBook = async (req, res, next) => {
    try {
        const { id } = req.params

        const order = await Order.findById(id)

        console.log(order)



        const boatId = order.boatId

        const boatman = await Boat.findOne({ _id: boatId })

        order.status = "Cancelled"
        boatman.servicesData.availability = "AVAILABLE"

        await boatman.save()
        await order.save()

        res.status(200).json({
            success: true,
            message: "Booking cancelled"
        })

    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

export {
    createBoatOrder,
    getDriverCarOrder,
    getUserCarOrder,
    allCarOrder,
    getCarOrderData,
    pickupUpdate,
    dropUpdate,
    cancelCarBook
}