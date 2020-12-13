const db = require('../../config/mongo');
const tablename = 'cart';

const insert = async (body) => await db.get().collection(tablename).insert(body);

const updateOne = async (query,data,condition) => await db.get().collection(tablename).updateOne(query,data,condition);

module.exports={
    insert,
    updateOne
}
