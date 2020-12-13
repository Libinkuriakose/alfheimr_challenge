const db = require('../../config/mongo');
const tablename = 'electronics';

const find = async (data,collation) => await db.get().collection(tablename).aggregate(data,collation).toArray();

const getOne = async (_id) => await db.get().collection(tablename).findOne({_id});

const insert = async (body) => await db.get().collection(tablename).insert(body);


module.exports={
    find,
    getOne,
    insert
}
