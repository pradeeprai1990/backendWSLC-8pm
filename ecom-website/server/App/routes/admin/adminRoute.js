let express=require('express');
const categoryRoute = require('./categoryRoutes');
const sizeRoute = require('./sizeRoute');
const subcategoryRoute = require('./subCategoryRoutes');
let adminRoute=express.Router();

adminRoute.use("/category",categoryRoute) //http://localhost:8080/admin/category
adminRoute.use("/subcategory",subcategoryRoute)

adminRoute.use("/size",sizeRoute)
//http://localhost:8080/admin/subcategory/parent-category


module.exports=adminRoute;