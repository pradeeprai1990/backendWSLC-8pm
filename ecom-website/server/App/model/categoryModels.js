let mongoose=require('mongoose');
let categorySchema=new mongoose.Schema(
{
    catName:{
        type:String,
        required:true,
        unique:true
    },
    catImage:String,
    
    categoryDesc:String,
    catStatus:Boolean
},{
    timestamps:true
})

let categoryModel=mongoose.model("category",categorySchema)
module.exports=categoryModel;