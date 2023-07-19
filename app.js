require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000 || PROCESS.ENV.PORT;
const products_route = require('./routes/products');
const connectDB = require('./db/connect');

app.get('/', (req, res) => {
    res.send('Hi, I am live');
})

//Middleware or to set router
app.use('/api/products', products_route);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log(`Listening at Port ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
}
start();