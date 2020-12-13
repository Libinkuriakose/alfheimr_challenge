const express = require('express');
const router = express.Router();
const addToCart = require('./addToCart')
const validator = require('express-joi-validation').createValidator({})
const parser = require('body-parser');

router.post('/', parser.json(), validator.body(addToCart.bodySchema), addToCart.handler);


module.exports = {
    cartController: router
}
