const route = require("express").Router();
const jwt = require("jsonwebtoken");

// User, addUser, verifyUser
const { addUser, verifyUser } = require("../../controllers/auth");
const { Users } = require("../../db/models");

const { sendMailFn } = require("../../controllers/sendMail");

const bcrypt = require("bcryptjs");
const SECRET_KEY = "Rishabh#2206";

const fs = require("fs");
const path = require("path");
const { send } = require("process");
// const { generateKey } = require('crypto');

route.post("/login",  (req, res) => {
  console.log("Coming in login post server");
  const { email, password, userType } = req.body;
  console.log("login post server data:", email, password);
   verifyUser({ email, password, userType })
    .then((response) => {
      console.log(">>>",password,"^^",response.password.toString() );
      bcrypt.compare(password, response.password, function(err, resp) {
        if (err) {
          console.log("Error:", err);
          return res.status(401).json({ error: "Error comparing passwords." });
        }

        // console.log("Comparison result:", resp);
        
        if (resp) {
          console.log("Password matched. Sending response:", response);
          const token = jwt.sign(
            {
              userId: response.id,
              userEmail: response.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          res.status(200).send({
            message: "Login Successful",
            email: response.email,
            userType: response?.userType,
            token,
          });
  
          // return res.status(200).json(response);
        } else {
          console.log("Password does not match.");
          return res.status(401).json({ error: "Password does not match." });
        }
      })
    })
    .catch((err) => {
      console.log("ERROR:", err);
      return res.status(401).json({ error: err });
    });
});


route.post("/register", (req, res) => {
  console.log("Coming to post data register");
  console.log("data:", req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  let userType = req.body.userType;
  let agencyData = req.body.agencyData;

  if (password.length <= 6) {
    console.log("less password length");
    return res
      .status(415)
      .json({ error: "password length must be greater than 6 chanracters" });
    // return res.sendStatus(401).json({ data: "password length must be greater than 6 chanracters" });
  } else {
    bcrypt.genSalt(8, function (err, salt) {
      if (err) {
        throw err;
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            throw err;
          } else {
            console.log("HASH::", hash ,"FOR", password);

            addUser({
              firstName,
              lastName,
              userType,
              email,
              hash,
              userType,
              agencyData,
            })
              .then((response) => {
                console.log("RES CREATED USER:", response);
                // sendMailFn(email)
                return res.sendStatus(201, response);
              }) 
             
              .catch((err) => {
                console.log("ERROR in database:", err);
                return res.status(405).json({ error: err });
              });
          }
        });
      }
    });
  }
});

async function updateStatus(id) {
  await Users.update(
    {
      isVerified: true,
    },
    {
      where: { id: id },
    }
  )
    .then((DBres) => {
      console.log("SUCCESS updated status ", DBres[0]);
      return DBres;
    })
    .catch((err) => {
      console.log("Error IN DB:", err);
      throw err;
    });
}
async function resendOTP(email) {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  return await Users.update(
    {
      otp: verificationCode,
      tokenCreated: new Date(),
    },
    {
      where: { email: email },
    }
  )
    .then((DBres) => {
      console.log("SUCCESS DB OPERATION ", DBres[0]);
      sendMailFn(verificationCode, email);
      return DBres;
    })
    .catch((err) => {
      console.log("Error IN DB:", err);
      throw err;
    });
}

route.post("/verify", async (req, response) => {
  // console.log("TOP is :", req.body.email,req.body.otp);
  const { email, otp } = req.body;

  await verifyUser({ email })
    .then((res) => {
      console.log("RES:::", res);
      if (res.isVerified) {
        return response
          .status(203)
          .json({ message: "you are already veried. Please Log in" });
      } else if (!res.isVerified) {
        console.log("Coming in not verified email ");
        const timeToken = res.tokenCreated;
        const tokenTime = new Date(timeToken);
        const currentTime = new Date();
        const timeDiff = currentTime - tokenTime;
        var seconds = Math.floor(timeDiff / 1000);
        var minutes = Math.floor(seconds / 60);
        console.log("MINUTESSSS VALLL #######:, ", minutes);

        if (minutes > 2) {
          resendOTP();
          return response
            .status(402)
            .json({ error: "OTP expired, please regenerate" });
        } else {
          console.log("Compairing the val ", otp, res.otp);
          if (otp == res.otp) {
            console.log("OTP verified");
            // await Users.update()
            updateStatus(res.id);
            return response
              .status(201)
              .json({ message: "OTP Verified, Please Log in now" });
          } else if (otp != res.otp) {
            return response.status(400).json({ error: "Incorrect OTP !" });
          }
        }
      }
    })
    .catch((err) => {
      console.log("ERR::", err);
    });
});

route.post("/resendOTP", async (req, res) => {
  const { email } = req.body;
  console.log("EMAIL RESEND:", email);
  await resendOTP(email)
    .then((resp) => {
      return res
        .status(201)
        .json({ message: "Code has been sent successfuly to your email" });
    })
    .catch((err) => {
      return res.status(402).json({ message: "Something went wrong!" });
    });
});

module.exports = {
  authRoute: route,
};
