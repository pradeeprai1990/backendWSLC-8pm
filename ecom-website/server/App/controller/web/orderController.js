const cartModel = require("../../model/cartModel");
const orderModel = require("../../model/OrderModel");

let orderSave = async (req, res) => {
    console.log(req.body)


    let orderSave = {
        shippingAddess: req.body.shippingAddess,
        orderItems: req.body.myCart,
        shippingCharges: req.body.shippingCharges,
        orderQty: req.body.orderQty,
        orderAmount: req.body.orderAmount,
        orderUser: req.user,
        PayementType: req.body.PayementType
    }

    if (req.body.PayementType == 1) {

        orderSave['orderStatus'] = "process";
        try {
            let order = new orderModel(orderSave);
            let savedOrder = await order.save()

            let deleteCart=await cartModel.deleteMany({user:req.user})

            res.status(200).json({ status: 1, message: "Order saved successfully" });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Order not saved" });
        }
    }

    else {

        //Online Payment
    }

    // try {
    //     let order = new orderModel(req.body);
    //     let savedOrder = await order.save();
    //     res.status(200).json({ status:1, message: "Order saved successfully" });
    // } catch (error) {
    //     res.status(500).json({ status:0, message: "Order not saved" });
    // }
}


module.exports = { orderSave };