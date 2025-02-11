let express=require('express');
let multer=require("multer")
const { productAdd, productView, parentCategory, size, color, subCategory } = require('../../controller/admin/productController');
let productRoute=express.Router();

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/product")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})



let uploads=multer({storage:storage})

let allImageupload=uploads.fields(
    [
        {
             name: 'productImage',
             maxCount:1
        },
        {
            name:'productAnimationImage',
            maxCount:1
        },
        {
            name:'productGallery',
            maxCount:10
        }
    ]
)

productRoute.post("/add",allImageupload,productAdd) //http://localhost:8080/admin/product/add

productRoute.get("/view",productView)



productRoute.get("/parent-category",parentCategory)


productRoute.get("/size",size)

productRoute.get("/color",color)

productRoute.get("/subcategory/:pid",subCategory)

module.exports=productRoute;