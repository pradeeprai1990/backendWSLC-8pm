let express=require('express');
let multer=require("multer")
const { categoryAdd, categoryView,  categoryEdit, categorysigleDelete, categorymultipleDelete } = require('../../controller/admin/categoryController');
let categoryRoute=express.Router();

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/category")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})



let uploads=multer({storage:storage})



categoryRoute.post("/add",uploads.single('categoryImage'),categoryAdd) //http://localhost:8080/admin/category/add

categoryRoute.get("/view",categoryView)

categoryRoute.delete("/delete/:id",categorysigleDelete)

categoryRoute.post("/muldelete/",categorymultipleDelete)


categoryRoute.get("/editRow/:id",categoryEdit)


module.exports=categoryRoute;