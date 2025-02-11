const categoryModel = require("../../model/categoryModels")
let fs = require("fs")
const sizeModel = require("../../model/sizeModel")
const colorModel = require("../../model/colorModel")
const subcategoryModel = require("../../model/subCategoryModel")
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

    console.log(req.files)
    res.send("Product Add")

}

let productView = async (req, res) => {

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