let mongoose=require('mongoose');
let productSchema=new mongoose.Schema(
{
    productName:{
        type:String,
        required:true,
        unique:true
    },
    productDescription:{
        type:String,
    },
    productShortDescription:{
        type:String,
    },
    productImage:{
        type:String,
    },
    productAnimationImage:{
        type:String,
    },
    productGallery:{
        type:Object,
    },
    productPrice:{
        type:Number,
    },
    productMRP:{
        type:Number,
    },
    parentCategory:{type: mongoose.Types.ObjectId, ref: "category"},
    subCategory:{type: mongoose.Types.ObjectId, ref: "subcategory"},
    productColors:[
        {type: mongoose.Types.ObjectId, ref: "color"}
    ],
    productSize:[
        {type: mongoose.Types.ObjectId, ref: "size"}
    ],
    productFeatured:{
        type: String,
        enum : ["1","0"], //
        default: '0'
    },
    productStatus:Boolean
},{
    timestamps:true
})

let productModel=mongoose.model("product",productSchema)
module.exports=productModel;