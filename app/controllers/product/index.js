const express = require('express');
const router = express.Router();
const filter = require('./filter')
const validator = require('express-joi-validation').createValidator({})
const parser = require('body-parser');


router.post('/filter', parser.json(), validator.body(filter.bodySchema), filter.handler);

module.exports = {
    productController: router
}
