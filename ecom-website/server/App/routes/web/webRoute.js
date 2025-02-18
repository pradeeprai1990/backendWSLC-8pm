let express=require('express');
const { userAuth } = require('./userAuthRoute');

let webRoute=express.Router();

webRoute.use("/user",userAuth)

//http://localhost:8080/admin/subcategory/parent-category


module.exports=webRoute;