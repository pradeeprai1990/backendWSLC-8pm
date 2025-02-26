const cartModel = require("../../model/cartModel");


let addtoCart = async (req, res) => {
    let product = req.body.product; //productID
    let quantity = req.body.quantity; //quantity
    let colorId = req.body.colorId; //colorID
    let sizeId = req.body.sizeId; //    sizeID
    let user = req.user; //userId

    //Check Product Id color Id and Size Id with and condition

    let cartData = await cartModel.find(
        { product: product, colorId: colorId, sizeId: sizeId, user: user }
    )

    // console.log(cartData)
    if (cartData.length > 0) {
        //Item add ready add in Cart
        let cartId = cartData[0]._id;
        await cartModel.updateOne({
            _id: cartId
        }, {
            quantity: cartData[0].quantity+1
        })
        res.send({
            status: 1,
            msg: "Product Updated in Cart"
        })

    }
    else{
        let cartObj = {
            product: product,
            quantity: quantity,
            colorId: colorId,
            sizeId: sizeId,
            user: user
        }
        let cartData = new cartModel(cartObj);
        await cartData.save();
        res.send({
            status: 1,
            msg: "Product Added in Cart"
        })
    }
   
}

let getCart=async (req,res)=>{
    let user = req.user;
    console.log(user)
    try{
        let data=await cartModel.find({user:user}).populate('colorId','colorName').populate('sizeId','sizeName').populate('product');
        res.send({
                        status:1,
                        msg:"Data Found",
                        staticPath:"uploads/product/",
                        data:data
                    })
    }
    catch(error){
        res.send({
                        status:0,
                        msg:"No Data Found"
                    })
    }
   

    // cartModel.find({user:user}).populate('product').populate('colorId').populate('sizeId').exec((err,result)=>{
    //     if(err){
    //         res.send({
    //             status:0,
    //             msg:"No Data Found"
    //         })
    //     }
    //     else{
    //         res.send({
    //             status:1,
    //             msg:"Data Found",
    //             data:result
    //         })
    //     }
    // })
}

let deleteCart=(req,res)=>{
    let id=req.params.id

    console.log(id)

    cartModel.deleteOne({_id:id}).then((result)=>{

        res.send({
            status:1,
                   msg:"Cart Deleted"

        })
    }).catch((err)=>{
        res.send({
            status:0,
            msg:"Cart Not Deleted"
        })
    })
    
    // let deleteRes=await cartModel.deleteOne({_id:id})
    // if(deleteRes){
    //     res.send({
    //         status:1,
    //         msg:"Cart Deleted"
    //     })
    // }
    // else{
    //     res.send({
    //         status:0,
    //         msg:"Cart Not Deleted"
    //     })
    // }


    // cartModel.deleteOne({_id:id},(err,result)=>{
    //     if(err){
    //         res.send({
    //             status:0,
    //             msg:"Cart Not Deleted"
    //         })
    //     }
    //     else{
    //         res.send({
    //             status:1,
    //             msg:"Cart Deleted"
    //         })
    //     }
    // })


}

let changeQty=async (req,res)=>{
    let id=req.params.id;
    let qty=req.body.qty;

    let updateQty=await cartModel.updateOne({_id:id},{
        quantity:qty
    })
    if(updateQty){
        res.send({
            status:1,
            msg:"Quantity Updated"
        })
    }
    else{
        res.send({
            status:0,
            msg:"Quantity Not Updated"
        })
    }

}

module.exports = { addtoCart,getCart,deleteCart,changeQty }