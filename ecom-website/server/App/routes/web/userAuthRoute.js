let express=require("express")
const { createUser, login, sendOTP } = require("../../controller/web/userAuthController")
const multer = require("multer")

let userAuth=express.Router()

let uploads=multer({storage:''})
userAuth.post("/sendotp",sendOTP) //First Send OTP
userAuth.post("/register",uploads.none(),createUser) //Create User
userAuth.post("/login",  login)




module.exports={userAuth}