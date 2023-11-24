
const { Sequelize,DataTypes } = require("sequelize")

const db=new Sequelize({
    dialect:'mysql',
    database:'carrentalservice',
    username:'carrental',
    password:'carrentalpassword',
} )
//  db.sync({ force: true });


const COL_ID_DEF={
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
}  
const COL_USERNAME_DEF={
    type: Sequelize.DataTypes.STRING(30),
    unique:true,
    allowNull:false
}
const COL_TITLE_DEF={
    type:Sequelize.DataTypes.STRING(120),
    allowNull:false
}
 
// console.log("DFDFDFD:",COL_USERNAME_DEF);

// const Users=db.define('user',{
//      id:COL_ID_DEF,
//      username: COL_USERNAME_DEF
// })

const Auths = db.define('Auth', {
    // Model attributes are defined here
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    userName:{
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue:"guest"
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false
  
    },
    otp:{
      type:DataTypes.INTEGER,
      allowNull:true
    },
    isVerified:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    tokenCreated:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    userType:{
        type: DataTypes.STRING,
        allowNull:false,
    }
  }, {
    // Other model options go here
  });

const Users = db.define('User', {
    // Model attributes are defined here
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    userName:{
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue:"guest"
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    // Other model options go here
  });

  const Admins= db.define('Admin', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
      },
      userName:{
        type: DataTypes.STRING,
        allowNull:true,
        defaultValue:"guest"
      },
      email:{
        type: DataTypes.STRING,
        allowNull:false
      },
      agencyName:{
        type: DataTypes.STRING,
        allowNull: false
      },
      agencyAddress:{
        type: DataTypes.STRING,
        allowNull: false
      },
      agencyContact:{
        type: DataTypes.STRING,
        allowNull: false
      },
      agencyOwner:{
        type: DataTypes.STRING,
        allowNull: false
      },
      agencyRegistrationNo:{
        type: DataTypes.STRING,
        allowNull: false
      },

  })
  const Cars = db.define('Car', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    vendorId:{
      type: DataTypes.UUID,
      allowNull: true,
    },
    car: {
      type: DataTypes.STRING,
      allowNull: true
    },
    carModel: {
      type: DataTypes.STRING
    },
    carColor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    carModelYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    carVin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    mileage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fuelType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seatingCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gpsEnabled: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Insurance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    InsuranceExp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true
    },
    nextAvailableDate: {
      type: DataTypes.STRING,
      allowNull: true
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ratings: {
      type: DataTypes.STRING,
      allowNull: true
    },
    SecurityDep: {
      type: DataTypes.STRING,
      allowNull: true
    },
    PerDayCharge: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lateChargePerDay: {
      type: DataTypes.STRING,
      allowNull: true
    },
    features: {
      type: DataTypes.JSON,
      allowNull: true
    },
    rentalHistory: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });

  const Bookings= db.define('Booking', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
      },
      customerId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      customerEmail: {
        type: DataTypes.STRING,
        allowNull: false
      },
      vendorId:{
        type: DataTypes.UUID,
        allowNull:false,
        // defaultValue:"guest"
      },
      startDate:{
        type: DataTypes.DATE,
        allowNull:false
      },
      exprecetedEndDate:{
        type: DataTypes.DATE,
        allowNull:false
      },
      endDate:{
        type: DataTypes.DATE,
        allowNull: true
      },
      carModel:{
        type: DataTypes.STRING,
        allowNull: true
      },
      bookedCarId:{
        type: DataTypes.UUID,
        allowNull: false
      },
      totalFare:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      lateFare:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      numberOfDays:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      car:{
        type: DataTypes.STRING,
        allowNull: true
      }

  })


    


// const SocketUsers=db.define('socketUser',{
//    id: COL_ID_DEF,
//    socketId: {
//     allowNull: true,
//     type: Sequelize.DataTypes.STRING
//    },
//    UserId:{
//      allowNull: false,
//      type: Sequelize.DataTypes.STRING
//    }
// })





//CREATING THE RELATIONSHIP
//user realtion with post is one to many
// Users.hasMany(Posts);
// Posts.belongsTo(Users);   //this will create a foreign key of users in posts table
// //similar users relation with comment is one to many
// Users.hasMany(Comments);
// Comments.belongsTo(Users);  //this will create a foreign key of users in comments table
// //posts relation to Comments is one to many
// Posts.hasMany(Comments,  { onDelete: 'CASCADE' });
// Comments.belongsTo(Posts);
// Users.hasMany(Friends);
// Friends.belongsTo(Users);


Admins.hasMany(Cars);
Cars.belongsTo(Admins);
// Bookings.belongsTo(Cars);
Cars.hasMany(Bookings, { foreignKey: 'bookedCarId' });
Bookings.belongsTo(Cars, { foreignKey: 'bookedCarId' });
Bookings.belongsTo(Admins);
Bookings.belongsTo(Users);






// Users.hasMany(Notifications);
// Notifications.belongsTo(Users, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE', // This will delete notifications if the corresponding user is deleted
// });





// TableA.belongsTo(TableB, { onDelete: 'CASCADE' });

// Posts.belongsTo(Comments)

// Users.hasMany(Likes)
// Likes.belongsTo(Users)

// Posts.hasMany(Likes)
// Likes.belongsTo(Posts)


// console.log("users:",Users);
// console.log("Comments:",Comments);
// console.log("Posts",Posts);

module.exports={db,Users,Admins, Auths,Cars, Bookings};






  
  



