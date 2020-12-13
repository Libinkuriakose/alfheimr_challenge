
const Joi = require('joi')
const cart = require('../../models/cart')
const { ObjectId } = require('mongodb')

const bodySchema = Joi.object({
    productId: Joi.string().required().max(24).min(24).description('mongoId of product'),
    quantity: Joi.number().default(1).max(100).description('quantity of product'),
    vendor: Joi.string().required().max(24).min(24).description('one kind product may have multiple vendors'),
    offers: Joi.array().items(Joi.string().description('offer module mongodb id')).description('array of ids'),
    plans: Joi.array().items(Joi.string().description('plans module mongodb id')).description('array of ids,example-> for mobiles, plans could be protection policies,accident or damage protection plans'),
    giftCard: Joi.string().max(24).min(24).description('add a giftcard id to redeem it')
})//object validation

const handler = async (req, res) => {
    try {
        // const userId = req.user._id //user id to be taken from token
        const userId = "5fd4615977287f1f14c13a59"// hardcoded for demonstration
        
        cart.updateOne(
            {               //_id to find the cart
                'userId': ObjectId(userId)
            },
            {               //new data for updation
                '$set': {
                    userId: ObjectId(userId),
                    timestamp: +new Date()
                },
                '$addToSet': { items: {
                    productId: ObjectId(req.body.productId),
                    quantity: req.body.quantity,
                    vendor: ObjectId(req.body.vendor),
                    offers: req.body.offers ? await req.body.offers.map(id=> ObjectId(id)): [],
                    plans: req.body.plans ? await req.body.plans.map(id=> ObjectId(id)): [],
                    giftCard: req.body.giftCard ? ObjectId(req.body.giftCard) : ''
                } }//adding to cart item array
            },
            {               //criteria of updation
                upsert: true, returnNewDocument: true
            }
        );

        res.status(200).send("added to cart");
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    bodySchema
};