let mongoose=require('mongoose');
let colorSchema=new mongoose.Schema(
{
    colorName:{
        type:String,
        required:true,
        unique:true
    },
    colorCode:String,
    colorStatus:Boolean
},{
    timestamps:true
})

let colorModel=mongoose.model("color",colorSchema)
module.exports=colorModel;