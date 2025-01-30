let express=require('express');
const { sizeAdd, sizeView, sizeDelete, sizeEdit } = require('../../controller/admin/sizeController');

let sizeRoute=express.Router();

sizeRoute.post("/add",sizeAdd)

sizeRoute.get("/view",sizeView)

sizeRoute.delete("/delete/:id",sizeDelete)

sizeRoute.get("/editRow/:id",sizeEdit)


module.exports=sizeRoute;