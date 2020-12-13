const Joi =require('Joi')
const redis = require('../../middlewares/redis')
const product = require('../../models/product')


const bodySchema = Joi.object({
    name: Joi.string().max(250).description('name of product'),
    price: Joi.object({
        minimum: Joi.number().description("minimum price"),
        maximum: Joi.number().description("maximum price")
    }).description('price range of item'),
    category: Joi.string().description('category'),
    subcategory: Joi.array().items(Joi.string()).description('array of string values of subcategory'),
    specifications: Joi.array().items(Joi.object({
        key: Joi.string().required().description("key name of specification, example-> ram"),
        value: Joi.string().required().description("value of corresponding key, example-> 6GB")
    })).description('specification accepts values in array of objects'),
    skip: Joi.number().description("data skip"),
    limit: Joi.number().description("number of maximum items to get")

})//joi validation on incoming body object and limiting any unwanted data


const handler = async (req, res) => {
    try {
        
        if(req.body.hasOwnProperty('category')&&(Object.keys(req.body)).length==1){
            const result = await redis.redisFetch(req.body.category);
            if(result)return res.status(200).send({message: "fetching redis cached data",data: result});
        }//checking redis cache

        const collation = { collation: { locale: "en", strength: 2 } };
        const mongoArguments = [
            {
                '$match':{}
            },
            {
                '$project':{
                    name:1,
                    price:1,
                    specifications:1
                }
            },
            {
                '$sort': {}
            },
            {
                '$skip': req.body.skip||0
            },
            {
                '$limit': req.body.limit||1000
            }
        ];//initializing aggregation operations

        if(req.body.name)mongoArguments[0].$match.name ={$regex:req.body.name,$options:"i"} //product name searching using regex and indexing( incase sensitive ops by giving collation)

        if(req.body.price){

            if(req.body.price.hasOwnProperty("minimum")&&req.body.price.hasOwnProperty("maximum"))mongoArguments[0].$match.price ={$gte:req.body.price.minimum,$lte:req.body.price.maximum};

            else{

                mongoArguments[0].$match.price = req.body.price.hasOwnProperty("minimum") ? {$gte:req.body.price.minimum}
                : {$lte:req.body.price.maximum}
            }////// if price may hav min & max/ only min/ only max then arranging queries

            mongoArguments[2]['$sort']= {price:-1} //price sort if price field is present
        
        }else{

            mongoArguments[2]['$sort']= {createdAt:-1} //sort by creation time
        }

        if(req.body.category)mongoArguments[0].$match.category =req.body.category;

        if(req.body.subcategory){

            mongoArguments[0].$match.$and=[]
            req.body.subcategory.forEach((item)=>{ mongoArguments[0].$match.$and.push({"subcategory":item})});

        }//if subcategory is present then add them to query with $and 

        if(req.body.specifications){

            if(!mongoArguments[0].$match.hasOwnProperty("$and"))mongoArguments[0].$match.$and=[];//checking $and operator is already added or not

            req.body.specifications.forEach((object)=>{ mongoArguments[0].$match.$and.push({"specifications.key":object.key},{"specifications.value":object.value})});

        }// loop through specifications 
        
        
        const result = await product.find(mongoArguments,collation);

        if(req.body.hasOwnProperty('category')&&(Object.keys(req.body)).length==1)redis.redisSave(req.body.category,result)

        res.status(200).send({message: "succesfully done",data: result});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    handler,
    bodySchema
};