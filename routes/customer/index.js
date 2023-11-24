const {
  addBooking,
  getBookings,
} = require("../../controllers/cutomers/Booking");
const { getAllCars, getCarById } = require("../../controllers/cutomers/cars");

const auth = require("../../middlewares/auth");

const route = require("express").Router();

route.get("/allCars", (req, res) => {
  console.log("Coming to get all Cars", req.query);
  const { page, limit } = req.query;

  getAllCars({ page, limit })
    .then((resp) => {
      console.log("RES", resp);
      res.status(200).send(resp);
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
});
route.get("/getCar", (req, res) => {
  let { id } = req.query;

  getCarById({ id })
    .then((resp) => {
      console.log("RES", resp);
      if (resp.length <= 0) {
        return res.status(402).json({ error: "Invalid Car Id" });
      }
      res.status(200).send(resp);
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
});

route.post("/addOrder", auth, async (req, res) => {
  console.log(">>", req.body, req.headers);

  // const addedBy = req.headers.usertoken;
  let orderData = req.body;
  orderData = {
    ...orderData,
    customerId: req.user.userId,
    customerEmail: req.user.userEmail,
  };

  addBooking(orderData)
    .then((response) => {
      console.log("SUCXXXX", response);
      return res.status(200).json({ response });
    })
    .catch((err) => {
      console.log("err in server too ", err);
      return res.status(403).json({ error: err });
    });
});

route.get("/getOrders", auth, async (req, res) => {
  const addedBy = req.user.userId;

  getBookings({ addedBy })
    .then((resp) => {
      console.log("RES", resp);

      res.status(200).send(resp);
    })
    .catch((err) => {
      return res.status(401).json({ error: err });
    });
});

route.get("/some", auth, (req, res) => {
  console.log("REQQ", req.user);
  res.send("GOT IT");
});
// route.post('/disable/:id', (req,res)=>{
//     console.log("Disable");
// })
// route.post('/deactivate/:id', (req,res)=>{
//     console.log("deactivate");
// })

module.exports = {
  customerRoute: route,
};
