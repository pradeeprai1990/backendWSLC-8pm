let express = require('express');
const { orderSave, verifyOrder, showOrder, showsingleOrder } = require('../../controller/web/orderController');
const { checkUserLogin } = require('../../middleware/checkUserLogin');

let orderRoute=express.Router()


orderRoute.post('/saveorder',checkUserLogin,orderSave)

orderRoute.post('/verify-order',checkUserLogin,verifyOrder)

orderRoute.get('/view-order',checkUserLogin,showOrder)

orderRoute.get('/single-order/:id',checkUserLogin,showsingleOrder)



module.exports={orderRoute}