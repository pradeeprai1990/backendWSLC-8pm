let express=require("express")
const { createUser, login } = require("../../controller/web/userAuthController")

let userAuth=express.Router()

userAuth.post("/register",createUser)
userAuth.post("/login",  login)




module.exports={userAuth}