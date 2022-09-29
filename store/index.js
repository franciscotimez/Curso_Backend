
const { MONGO_DB } = require('../config');
const { CartDaoFS } = require('./daos/cart/CartDaoFS');
const { ProductsDaoFS } = require('./daos/products/ProductsDaoFS');

let productsStore;
let cartStore;

(async () => {
    productsStore = new ProductsDaoFS();
    cartStore = new CartDaoFS();
    console.log("load json file");
})();

module.exports = { productsStore, cartStore };