const categoryModel = require("../../model/categoryModels")
let fs = require("fs")
const sizeModel = require("../../model/sizeModel")
const colorModel = require("../../model/colorModel")
const subcategoryModel = require("../../model/subCategoryModel")
const productModel = require("../../model/productModels")
let productAdd = async (req, res) => {
    let { productName, productDescription, productShortDescription, productPrice, productMRP, parentCategory, subCategory, productSize, productColors, status } = req.body;
    let insertOBJ = {
        productName,
        productDescription,
        productShortDescription,
        productPrice,
        productMRP,
        parentCategory,
        subCategory,
        productSize,
        productColors,
        status

    }

    console.log(insertOBJ)

   if(req.files){
        if(req.files.productImage){
            insertOBJ['productImage']=req.files.productImage[0].filename
        }
        if(req.files.productAnimationImage){
            insertOBJ['productAnimationImage']=req.files.productAnimationImage[0].filename
        }
        if(req.files.productGallery){
            let allGalleryImages=req.files.productGallery.map((items)=>items.filename)
            insertOBJ['productGallery']=allGalleryImages
        }
   }
    let product=new productModel(insertOBJ)
    let insertRes=await product.save()
    let resObj={
        status:1,
        msg:"Product Save",
        insertRes
    }
    res.send(resObj)

}

let productView = async (req, res) => {
    let product=await productModel.find().populate('parentCategory','catName').populate('subCategory','subcategoryName').populate('productSize','sizeName').populate('productColors','colorName')
    let resObj={
        status:1,
        msg:"Product Show",
        product
    }
    res.send(resObj)
}


let parentCategory = async (req, res) => {
    let data = await categoryModel.find({ catStatus: true }).select('catName')
    let resObj = {
        status: 1,
        data,

    }
    res.send(resObj)
}

let size = async (req, res) => {
    let data = await sizeModel.find({ sizeStatus: true }).select('sizeName')
    let resObj = {
        status: 1,
        data,

    }
    res.send(resObj)
}

let color = async (req, res) => {
    let data = await colorModel.find({ colorStatus: true }).select('colorName')
    let resObj = {
        status: 1,
        data,

    }
    res.send(resObj)
}

let subCategory = async (req, res) => {
    let parentId = req.params.pid;
    let data = await subcategoryModel.find({ parentCategory: parentId }).select('subcategoryName')
    let resObj = {
        status: 1,
        data,

    }
    res.send(resObj)
}


module.exports = { productAdd, productView, parentCategory, size, color, subCategory }

//http://localhost:8080/uploads/category/senior-768w.jpg