const { Sequelize } = require('sequelize');
const {Users,Auths, Admins,Cars, db} =require('../../db/models')

async function getAllCars({page,limit}){
      
    // try {
    //     const posts=await Cars.findAll({
    //         // include:[{model:Users}, {model:Likes}, {model:Comments,order:[['createdAt','DESC']],include:[{model:Users,  attributes: ['id', 'firstName'],}]}],
    //         order: [['createdAt', 'DESC']]
    //         // include:[Likes]
    //     })
    //     return posts;
    // } catch (error) {
    //     throw error;   
    // }



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
      res.status(500).json({ error: 'Internal Server Error' });
    }


}

async function getCarById({id}){
      
    return await Cars.findAll({
     where:{id:id}
      // Other conditions or options...
    }).then(resp=>{
      return resp;
    }
    )
    .catch(err=>{
      throw err
    })
}


module.exports={
getAllCars,getCarById
    
}
