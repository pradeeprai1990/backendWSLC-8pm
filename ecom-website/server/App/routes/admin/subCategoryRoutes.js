let express=require('express');
let multer=require("multer")
const { subcategoryAdd, subcategoryView,  subcategoryEdit, subcategorysigleDelete, subcategorymultipleDelete, subcategoryUpdate, getParentCategory } = require('../../controller/admin/subCategoryController');
let subcategoryRoute=express.Router();

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/subcategory")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})



let uploads=multer({storage:storage})



subcategoryRoute.post("/add",uploads.single('subCategoryImage'),subcategoryAdd) //http://localhost:8080/admin/category/add

subcategoryRoute.get("/view",subcategoryView)

subcategoryRoute.delete("/delete/:id",subcategorysigleDelete)

subcategoryRoute.post("/muldelete/",subcategorymultipleDelete)


subcategoryRoute.get("/editRow/:id",subcategoryEdit)

subcategoryRoute.put("/update/:id", uploads.single('categoryImage'),  subcategoryUpdate)


subcategoryRoute.get("/parent-category",getParentCategory)
module.exports=subcategoryRoute;