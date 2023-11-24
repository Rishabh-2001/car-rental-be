const { Cars } = require("../../db/models");



async function addCar(data)
{
    console.log("REACHing here", data);
    try {
       const AddRes= await Cars.create({
            car:data.car,
            carModel:data.car_model,
            carColor: data.car_color,
            carModelYear: data.car_model_year,
            carVin: data.car_vin,
            price: data.price,
            availability: data.availability,
            mileage: data.Mileage,
            fuelType: data.FuelType,
            seatingCapacity: data.SeatingCapacity,
            registration: data.registration,
            gpsEnabled: data.gpsEnabled,
            Insurance: data.Insurance,
            InsuranceExp: data.InsuranceExp,
            Location: data.Location,
            images: data.images,
            nextAvailableDate: data.nextAvaiableDate,
            discount: data.discount,
            ratings: data.ratings,
            SecurityDep: data.SecurityDep,
            PerDayCharge: data.PerDayCharge,
            lateChargePerDay: data.lateChargePerDay,
            features: data.features,
            rentalHistory: data.rentalHistory,
            vendorId: data.vendorId
          });
          console.log("%%",AddRes);
          return {data: "Success"}


    } catch (error) {
        throw error;
    }
  
}


async function getCars({page,limit}){
      
 



     page = parseInt(page) || 1;
    const perPage = parseInt(limit) || 10;
  
    const offset = (page - 1) * limit;
  
    try {
      const { count, rows } = await Cars.findAndCountAll({
        limit: perPage,
        offset: offset,
        order: [['createdAt', 'DESC']]
        // Other conditions or options...
      });
  
      return {
        data:{
            totalItems: count,
            totalPages: Math.ceil(count / perPage),
            currentPage: page,
            cars: rows,
      }};
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }


}

module.exports={addCar, getCars}