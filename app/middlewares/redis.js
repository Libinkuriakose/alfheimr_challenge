const redis = require('redis')
const { promisify } = require('util')

const createClient = redis.createClient({
    host: process.env.REDIS_HOST||'127.0.0.1',
    port: process.env.REDIS_PORT||'6379'
})

const get_async = promisify(createClient.get).bind(createClient);
const set_async = promisify(createClient.setex).bind(createClient);

const redisSave = async (key,data)=>{
    try{
        set_async(key,60,JSON.stringify(data))
        return "done";
    }catch(err){
        console.log(`redis get api error: ${err}`);
        throw err;
    }
}

const redisFetch = async (key)=>{
    try{
        return JSON.parse(await get_async(key))
    }catch(err){
        console.log(`redis get api error: ${err}`);
        throw err;
    }   
}

module.exports={
    createClient,
    redisSave,
    redisFetch
}