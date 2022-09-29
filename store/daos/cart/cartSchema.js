const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: { type: Number, require: true },
    products: { type: Array, require: true}
});

module.exports = { cartSchema };