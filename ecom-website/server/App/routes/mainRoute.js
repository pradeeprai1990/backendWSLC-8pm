let express=require('express');
const adminRoute = require('./admin/adminRoute');
let mainRoute=express.Router();

mainRoute.use("/admin",adminRoute) //http://localhost:8080/admin




module.exports=mainRoute;