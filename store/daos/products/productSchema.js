const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: { type: Number, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: Number, require: true },
    image: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
});

module.exports = { productSchema };