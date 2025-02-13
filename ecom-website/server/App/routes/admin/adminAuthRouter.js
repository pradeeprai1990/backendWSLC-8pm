let express=require("express")
const { adminLogin } = require("../../controller/admin/AuthController")

let adminAuthRoute=express.Router()

adminAuthRoute.post("/login",adminLogin)



module.exports={adminAuthRoute}