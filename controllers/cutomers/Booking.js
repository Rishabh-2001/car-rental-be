const { Sequelize } = require("sequelize");
const { Users, Auths, Admins, Cars, Bookings, db } = require("../../db/models");

async function addBooking(data) {
  try {
    const AddRes = await Bookings.create({
      customerId: data.customerId,
      customerEmail: data.customerEmail,
      vendorId: data.vendorId,
      startDate: data.startDate,
      exprecetedEndDate: data.expectedEndDate,
      carModel: data.carModel,
      car: data.car,
      bookedCarId: data?.carId,
      totalFare: data.totalFare,
      lateFare: data.lateChargePerDay,
      numberOfDays: data.numberOfDaysBooked,
    });
    // console.log("%%", AddRes);
    return { data: "Success" };
  } catch (error) {
    console.log("ERRRR", error);
    throw error;
  }
}

async function getBookings({ addedBy }) {
  console.log("DVBB");
  return await Bookings.findAll({
    where: { customerId: addedBy },
    // Other conditions or options...
  })
    .then((resp) => {
      console.log("FOUND", resp);
      return resp;
    })
    .catch((err) => {
      console.log("ER>>>", err);
      throw err;
    });
}

module.exports = {
  addBooking,
  getBookings,
};
