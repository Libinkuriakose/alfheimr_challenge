const express = require('express');
const router = express.Router();

const {productController}  = require('../app/controllers/product');
const {cartController}  = require('../app/controllers/cart');
const {orderController}  = require('../app/controllers/order');


router.use('/product',productController);
router.use('/cart',cartController);
router.use('/order',orderController);




module.exports = router
