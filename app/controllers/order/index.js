const express = require('express');
const router = express.Router();
const post = require('./postOrder')
const validator = require('express-joi-validation').createValidator({})
const parser = require('body-parser');

router.post('/', parser.json(), validator.body(post.bodySchema), post.handler);


module.exports = {
    orderController: router
}
