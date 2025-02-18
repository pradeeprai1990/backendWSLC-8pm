let mongoose=require('mongoose');
let userSchema=new mongoose.Schema(
{
    firstName:String,
    lastName:String,
    userEmail:{
        unique:true,
        type:String
    },
    password:String,
    gender:String,
},{
    timestamps:true
})

let userModel=mongoose.model("user",userSchema)
module.exports=userModel;