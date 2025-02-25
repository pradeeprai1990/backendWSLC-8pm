let express = require('express');
const { addtoCart, getCart } = require('../../controller/web/cartController');
const { checkUserLogin } = require('../../middleware/checkUserLogin');
let cartRoute = express.Router();

cartRoute.post('/add-to-cart',checkUserLogin, addtoCart)
cartRoute.get('/get-cart',checkUserLogin, getCart)



// cartRoute.delete('/delete-cart',checkUserLogin, deleteCart)
// cartRoute.put('/update-cart',checkUserLogin, updateCart)

module.exports = cartRoute;
