let express=require('express');
const adminRoute = require('./admin/adminRoute');
const webRoute = require('./web/webRoute');
let mainRoute=express.Router();

mainRoute.use("/admin",adminRoute) //http://localhost:8080/admin


mainRoute.use("/web",webRoute) //http://localhost:8080/admin




module.exports=mainRoute;