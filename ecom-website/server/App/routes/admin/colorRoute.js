let express=require('express');
const { colorAdd, colorView, colorDelete, colorEdit } = require('../../controller/admin/colorController');


let colorRoute=express.Router();

colorRoute.post("/add",colorAdd)

colorRoute.get("/view",colorView)

// colorRoute.delete("/delete/:id",colorDelete)

// colorRoute.get("/editRow/:id",colorEdit)


module.exports=colorRoute;