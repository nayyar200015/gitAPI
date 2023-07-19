const product = require('../models/product');
const Product = require('../models/product');

async function getAllProducts(req, res) {
    try {
        const { sort, select } = req.query;
        let apiData = product.find({});
        if (sort) {
            const sortFix = sort.replace(',', " ");
            apiData = apiData.sort(sortFix);
        }
        if (select) {
            const selectFix = select.split(',').join(" ");
            apiData = apiData.select(selectFix);
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.page) || 5;
        const skip = (page - 1) * limit;
        apiData = apiData.skip(skip).limit(limit);

        const Products = await apiData;
        res.status(200).json({ Products, nbHits: Products.length });
    } catch (err) {
        console.log(`Error is ${err}`);
    }
};

async function getAllProductsTesting(req, res) {
    try {
        const { company, name, featured } = req.query;
        const queryObject = {};
        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }
        if (featured) {
            queryObject.featured = featured;
        }
        if (company) {
            queryObject.company = company;
        }
        const Products = await Product.find(queryObject);
        res.status(200).json({ Products });
    } catch (err) {
        console.log(`Error is ${err}`);
    }
};

module.exports = { getAllProducts, getAllProductsTesting };