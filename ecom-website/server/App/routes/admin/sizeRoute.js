let express=require('express');
const { sizeAdd, sizeView, sizeDelete, sizeEdit } = require('../../controller/admin/sizeController');
const multer = require('multer');

let uploads=multer({storage:''})


let sizeRoute=express.Router();

sizeRoute.post("/add",uploads.none(),sizeAdd)

sizeRoute.get("/view",sizeView)

sizeRoute.delete("/delete/:id",sizeDelete)

sizeRoute.get("/editRow/:id",sizeEdit)


module.exports=sizeRoute;