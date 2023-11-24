const { Bookings, Cars, Users } = require("../../db/models");

async function getOrderBookings({ id }) {
  return await Bookings.findAll({
    where: { vendorId: id },
    include: [
      {
        model: Cars,
        attributes: [
          "id",
          "car",
          "carModel",
          "carColor",
          "carModelYear",
          // Add other attributes you want to retrieve
        ],
      },
      {
        model: Users,
        attributes: ["id", "firstName", "lastName", "userName", "email"],
      },
    ],
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
  getOrderBookings,
};
