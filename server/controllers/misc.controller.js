import AppError from '../utils/error.utils.js'
import User from "../models/user.models.js"
import Boat from '../models/boat.models.js'
import Hotel from '../models/hotel.model.js'
import Guider from '../models/guider.model.js'
import Cars from '../models/cars.models.js'
import Priest from '../models/priest.model.js'
import BoatBookings from "../models/bookings/boatOrder.models.js"
import HotelBookings from "../models/bookings/hotelBook.model.js"
import GuiderBookings from "../models/bookings/guiderOrder.model.js"
import PriestBookings from "../models/bookings/priestOrder.model.js"
import CarBookings from "../models/bookings/carOrder.models.js"
const userStats = async (req, res, next) => {
    try {
        const totalUser = await User.countDocuments()
        const totalBoater = await Boat.countDocuments()
        const totalHotel = await Hotel.countDocuments()
        const totalGuider = await Guider.countDocuments()
        const totalDriver = await Cars.countDocuments()
        const totalPriest = await Priest.countDocuments()

        res.status(200).json({
            success: true,
            totalUser,
            totalBoater,
            totalHotel,
            totalGuider,
            totalDriver,
            totalPriest
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

const bookingStats = async (req, res, next) => {
    try {
        const totalBoatBook = await BoatBookings.countDocuments()
        const totalHotelBook = await HotelBookings.countDocuments()
        const totalGuiderBook = await GuiderBookings.countDocuments()
        const totalCarBook = await CarBookings.countDocuments()
        const totalPriestBook = await PriestBookings.countDocuments()

        res.status(200).json({
            success: true,
            totalBoatBook,
            totalHotelBook,
            totalGuiderBook,
            totalCarBook,
            totalPriestBook
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

export {
    userStats,
    bookingStats
}