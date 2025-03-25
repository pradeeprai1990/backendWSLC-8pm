const cartModel = require("../../model/cartModel");
const orderModel = require("../../model/OrderModel");
const Razorpay = require('razorpay');
let crypto=require('crypto')
const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc',
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY',
});

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



    let deleteCart=await cartModel.deleteMany({user:req.user})

    if (req.body.PayementType == 1) {

        orderSave['orderStatus'] = "process";
        try {
            let order = new orderModel(orderSave);
            let savedOrder = await order.save()
            let deleteCart=await cartModel.deleteMany({user:req.user})

            res.status(200).json({ status: 1, message: "Order saved successfully",paymentMethod:1 });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Order not saved" });
        }
    }

    else {
        orderSave['paymentStatus'] = "1"; //pending
        orderSave['orderStatus'] = "pending";
        let deleteCart=await cartModel.deleteMany({user:req.user})
        let order = new orderModel(orderSave);
        let savedOrder = await order.save() //
       // let deleteCart=await cartModel.deleteMany({user:req.user})
        //Rzorpay
        let options = {
            amount: savedOrder.orderAmount * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: savedOrder._id,
            
        };
        const  razorpayorder = await razorpayInstance.orders.create(options);
        
        console.log(razorpayorder)
        let updateOrderId=await orderModel.updateOne({_id:savedOrder._id},
            {razorpayOrderId:razorpayorder.id})
        res.status(200).json({ status: 1,razorpayorder,paymentMethod:2 });

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

let verifyOrder=async (req,res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const key_secret = '68E17CNWY8SemCvZ6ylOkuOY';
    const hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if(generated_signature==razorpay_signature){
        let updateOrder=await orderModel.updateOne(
            {razorpayOrderId:razorpay_order_id},
            {
                razorpayPayment:razorpay_payment_id,
                paymentStatus:2,
                orderStatus:"process"
            })
       
            res.status(200).json({status:1,message:"Payment Success"})
    }
    else{
        res.status(400).json({status:0,message:"Invalid Signature"})
    }

   // razorpay_order_id="order_Q2N7V3eV1RLWrU"
//razorpay_payment_id="pay_Q2N8AZm2we0HA0"
//razorpay_signature="651a951918d3951678ab2e0757d5167b6c4f50e4f5d359feacf52c6e04766499"
//  razorpay_order_id + razorpay_payment_id

//razorpay_signature="651a951918d3951678ab2e0757d5167b6c4f50e4f5d359feacf52c6e04766499"

}

let showOrder=async (req,res)=>{
    let userId= req.user
    let myOrder=await orderModel.find({orderUser:userId}).populate('orderItems')
    res.send({status:1,data:myOrder})
}

let showsingleOrder=async (req,res)=>{
    let {id}= req.params
    let myOrder=await orderModel.findOne({_id:id})

    
    res.send(
        {
            status:1,
            data:myOrder, 
            staticPath:"uploads/product/"
       })
}

module.exports = { orderSave,verifyOrder,showOrder,showsingleOrder};