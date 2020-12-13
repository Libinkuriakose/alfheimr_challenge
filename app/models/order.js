const db = require('../../config/mongo');
const tablename = 'order';

const insert = async (body) => await db.get().collection(tablename).insert(body);

module.exports={
    insert
}
