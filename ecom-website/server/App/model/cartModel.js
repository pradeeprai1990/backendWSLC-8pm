let mongoose=require('mongoose');
let cartSchema=new mongoose.Schema(
{
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    colorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"color",
        required:true
    },
    sizeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"size",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
   
},{
    timestamps:true
})

let cartModel=mongoose.model("cart",cartSchema)
module.exports=cartModel;