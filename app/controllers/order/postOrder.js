
const Joi = require('joi')
const order = require('../../models/order')
const {ObjectId} = require('mongodb')

const bodySchema = Joi.object({
    directPurchase: Joi.number().allow(0,1).default(0).required().description('checkout from product?0->no, 1-yes'),
    cartId: Joi.string().when('directPurchase',{
        is:0, then: Joi.string().required().max(24).min(24)
    }).description('mongoid of cart'),
    productId: Joi.string().when('directPurchase',{
        is:1, then: Joi.string().required().max(24).min(24)
    }).description('mongoid of product'),
    deliveryOptions: Joi.number().required().allow(1,2,3).description('1->free delivery, 2-> instant delivery, 3->prime member delivery mode'),
    paymentMethods: Joi.number().required().allow(1,2,3,4).description('1-> COD, 2->netbanking, 3->cards, 4->EMI')
})//object validation using joi

const handler = async (req, res) => {
    try {

      if(req.body.directPurchase==0) req.body.cartId = ObjectId(req.body.cartId)
      else req.body.productId = ObjectId(req.body.productId)//making string into mongoId, makes aggregation easy

        req.body.timestamp= +new Date();//adding timestamp
        req.body.status= 0;//0->unresolved//1->placed//2->handled//3->delivered//4->cancelled
        // req.body.userId= req.user._id //get userid from token
        req.body.userId = new ObjectId()//random id
        delete req.body.directPurchase

        order.insert(req.body);
        res.status(200).send("succesfully created order");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    bodySchema
};