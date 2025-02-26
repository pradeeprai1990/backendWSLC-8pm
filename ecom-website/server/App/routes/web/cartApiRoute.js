let express = require('express');
const { addtoCart, getCart, deleteCart, changeQty } = require('../../controller/web/cartController');
const { checkUserLogin } = require('../../middleware/checkUserLogin');
let cartRoute = express.Router();

cartRoute.post('/add-to-cart',checkUserLogin, addtoCart)
cartRoute.get('/get-cart',checkUserLogin, getCart)



cartRoute.delete('/delete-cart/:id',checkUserLogin, deleteCart)
cartRoute.put('/change-qty/:id',checkUserLogin, changeQty)

module.exports = cartRoute;
