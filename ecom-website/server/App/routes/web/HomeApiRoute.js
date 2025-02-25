
let express=require("express")
const { getCategory, getProduct } = require("../../controller/web/HomePageController")
let homeApi=express.Router()


homeApi.get('/parent-category',getCategory)

homeApi.get('/product-featured',getProduct)


module.exports={homeApi}