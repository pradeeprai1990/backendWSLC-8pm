let express=require("express")
const { createUser, login, sendOTP, chnagePassword, changePassword } = require("../../controller/web/userAuthController")
const multer = require("multer")
const { checkUserLogin } = require("../../middleware/checkUserLogin")

let userAuth=express.Router()

let uploads=multer({storage:''})
userAuth.post("/sendotp",sendOTP) //First Send OTP
userAuth.post("/register",uploads.none(),createUser) //Create User
userAuth.post("/login",  login)


userAuth.post("/change-password",checkUserLogin,changePassword)




module.exports={userAuth}