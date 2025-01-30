let express=require('express');
const categoryRoute = require('./categoryRoutes');
const sizeRoute = require('./sizeRoute');
let adminRoute=express.Router();

adminRoute.use("/category",categoryRoute) //http://localhost:8080/admin/category
adminRoute.use("/size",sizeRoute)



module.exports=adminRoute;