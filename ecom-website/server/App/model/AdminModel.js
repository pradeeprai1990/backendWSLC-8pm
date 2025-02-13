let mongoose=require('mongoose');
let adminSchema=new mongoose.Schema(
{
    adminUname:{
        type:String,
        required:true,
        unique:true
    },
    adminPassword:String,
    
    
},{
    timestamps:true
})

let adminModel=mongoose.model("admin",adminSchema)
module.exports=adminModel;