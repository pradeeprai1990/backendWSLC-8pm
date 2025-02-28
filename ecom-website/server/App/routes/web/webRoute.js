let express=require('express');
const { userAuth } = require('./userAuthRoute');
const { homeApi } = require('./HomeApiRoute');
const cartRoute = require('./cartApiRoute');
const { orderRoute } = require('./orderRoute');

let webRoute=express.Router();

webRoute.use("/user",userAuth)

webRoute.use("/home",homeApi)

webRoute.use("/cart",cartRoute)

webRoute.use("/order",orderRoute)
//http://localhost:8080/web/home/parent-category


module.exports=webRoute;