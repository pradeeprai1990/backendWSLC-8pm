let express = require('express');
const { orderSave } = require('../../controller/web/orderController');
const { checkUserLogin } = require('../../middleware/checkUserLogin');

let orderRoute=express.Router()


orderRoute.post('/saveorder',checkUserLogin,orderSave)


module.exports={orderRoute}