require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/product');
const ProductJson = require('./products.json');

async function start() {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log('Success');
    } catch (err) {
        console.log(err);
    }
}

start();