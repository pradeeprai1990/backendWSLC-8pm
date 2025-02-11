let express=require('express');
const categoryRoute = require('./categoryRoutes');
const sizeRoute = require('./sizeRoute');
const subcategoryRoute = require('./subCategoryRoutes');
const colorRoute = require('./colorRoute');
const productRoute = require('./productRoute');
let adminRoute=express.Router();

adminRoute.use("/category",categoryRoute) //http://localhost:8080/admin/category
adminRoute.use("/subcategory",subcategoryRoute)
adminRoute.use("/color",colorRoute)

adminRoute.use("/size",sizeRoute)

adminRoute.use("/product",productRoute)
//http://localhost:8080/admin/subcategory/parent-category


module.exports=adminRoute;