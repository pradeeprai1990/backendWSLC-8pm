let express=require("express")
const { homeSlider, productNew, enquirySave } = require("../../controllers/web/homeController")

let homeRoutes=express.Router()

homeRoutes.get("/slider",homeSlider)

homeRoutes.get("/new-products",productNew)

homeRoutes.post("/enquiry",enquirySave)

module.exports={homeRoutes}