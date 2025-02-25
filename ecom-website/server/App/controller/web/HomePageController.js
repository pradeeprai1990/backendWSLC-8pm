const categoryModel = require("../../model/categoryModels")
const productModel = require("../../model/productModels")
let getCategory=async (req,res)=>{
    let categoryData=await categoryModel.find({catStatus:1})
    let resObj={
        status:1,
        msg:"Data View",
        data:categoryData,
        staticPath:"uploads/category/"
    }
   
    res.send(resObj)
}

let getProduct=async (req,res)=>{
    let categoryData=await productModel.find({productStatus:true,productFeatured:1}).populate('productSize','sizeName').populate('productColors','colorName').limit(4)
    
    let resObj={
        status:1,
        msg:"Data View",
        data:categoryData,
        staticPath:"uploads/product/"
    }
   
    res.send(resObj)
}

module.exports={getCategory,getProduct}