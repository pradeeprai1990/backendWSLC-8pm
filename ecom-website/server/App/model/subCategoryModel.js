let mongoose=require('mongoose');
let subcategorySchema=new mongoose.Schema(
{
    subcategoryName:{
        type:String,
        required:true,
        unique:true
    },
    parentCategory:{type: mongoose.Types.ObjectId, ref: "category"},
    subcategoryImage:String,
    
    subcategoryDesc:String,
    subcategoryStatus:Boolean
},{
    timestamps:true
})

let subcategoryModel=mongoose.model("subcategory",subcategorySchema)
module.exports=subcategoryModel;