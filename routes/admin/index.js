const { addCar, getCars } = require("../../controllers/admin/cars");
// const { getBookings } = require("../../controllers/cutomers/Booking");
const { getOrderBookings } = require("../../controllers/admin/Bookings");

const route = require("express").Router();

route.post("/addCar", async (req, res) => {
  console.log("IN ADD car", req.body, req.user);
  let data = req.body;

  data = { ...data, vendorId: req?.user?.userId };

  addCar(data)
    .then((response) => {
      console.log("SUCXXXX", response);
      return res.status(200).json({ response });
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
});

route.get("/getCars", (req, res) => {
  console.log("Coming to get all data000", req.query);
  const { page, limit } = req.query;

  getCars({ page, limit })
    .then((resp) => {
      console.log("RES", resp);
      res.status(200).send(resp);
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
});
route.get("/getOrders", (req, res) => {
  const id = req.user.userId;
  console.log("OI", id);
  getOrderBookings({ id })
    .then((resp) => {
      console.log("RES", resp);
      res.status(200).send(resp);
    })
    .catch((err) => {
      console.log("Err in ser", err);
      return res.status(401).json({ error: err });
    });
});

route.post("/disable/:id", (req, res) => {
  console.log("Disable");
});
route.post("/deactivate/:id", (req, res) => {
  console.log("deactivate");
});

module.exports = {
  adminRoute: route,
};
