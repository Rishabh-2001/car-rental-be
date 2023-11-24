const { Sequelize } = require('sequelize');
const {Users,Auths, Admins, db} =require('../db/models')
const bcrypt = require("bcryptjs");

async function addUser(userData){
    console.log("USER DARA ADDUSER",userData);
  
  return new Promise( (resolve, reject) => {
    Auths.findAll({
      where: {
        email: userData.email
      }
    }).then(async (res)=>{
      console.log("RES VALUE in reigster:", res);

      if(res.length>0)
      {
        // add ocondition to route if verified else already exist
        reject("user already exist")
      }
      else{
        const newus=await addUserFn({ userData })
        resolve(newus);
      }
    })
    .catch(err=>{
      console.log(err);
      reject(err.message)
    })
  })  
  
  }


  async function verifyUser(userData)
  {
    console.log("DB:",userData);
    return new Promise((resolve, reject) => {
        Auths.findAll({
          where:{
            email:userData.email,
            userType: userData.userType
          }
        })
        .then(async (res)=>{
          if(res.length>0)
          {
            //REQUIRED OINDITION 
  
            console.log("user already exist", res[0]);
            resolve(res[0].dataValues);
            
          }
          else{
            reject("This user email doesn't exist");
          }
  
        })
        .catch(err=>{
          console.log("ERROR in database:",err.message);
          reject(err.message)
        })
    })
  }

  async function addUserFn(data)
  {
    console.log("IN FINAL AUTH ", data);
    const {firstName,lastName,email,userType, hash}=data.userData;
    try {

        const result = await db.transaction(async (t) => {
          const user = await Auths.create({
            firstName: firstName,
            lastName: lastName,
            email:email,
            userType:userType,
            password: hash
          }, { transaction: t });
          let userDetails;
      if(userType==="ADMIN"){
        console.log("Adding admin");
        const {agencyName,agencyContact,agencyOwner,agencyRegNo,agencyAddress}=data?.userData?.agencyData;
           userDetails = await Admins.create({
            firstName: firstName,
            lastName: lastName,
            email:email,
            userType:userType,
            agencyName:agencyName,
            agencyAddress:agencyAddress,
            agencyContact:agencyContact,
            agencyOwner:agencyOwner,
            agencyRegistrationNo:agencyRegNo
          }, { transaction: t });
        }
        else{
          
            userDetails = await Users.create({
                firstName: firstName,
                lastName: lastName,
                email:email,
                userType:userType,
              }, { transaction: t });
        }
  
        return userDetails;  
        });
      return {data:result}
      } catch (error) {
         console.log("Error occured", error);
         throw error;
      }
  }
  
  module.exports= {Users,addUser,verifyUser};