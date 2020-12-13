const mongo = require("./config/mongo")
const express = require("express");
const app = express();
const routes = require('./config/routes');
const port = process.env.PORT||8000;

(async () => {

    await mongo.connect();

})()

app.use(express.json());
app.use('/alfheimr', routes);

app.listen(port, () => {
    console.log('listening on port', port);
});