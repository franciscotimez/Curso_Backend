
const { STORE_DATASOURCE, MONGO_DB } = require('../config');
const mongoose = require('mongoose');
const { CartDaoFS } = require('./daos/cart/CartDaoFS');
const { ProductsDaoFS } = require('./daos/products/ProductsDaoFS');
const { ProductsDaoMongoDB } = require('./daos/products/ProductsDaoMongoDB');
const { CartDaoMongoDB } = require('./daos/cart/CartDaoMongoDB');

let productsStore;
let cartStore;

(async () => {
    console.log("DataSource configuration: ", STORE_DATASOURCE);

    switch (STORE_DATASOURCE) {
        case "FS":
            productsStore = new ProductsDaoFS();
            cartStore = new CartDaoFS();

            console.log("[FS] -> Load json file");
            break;

        case "MONGO":
            productsStore = new ProductsDaoMongoDB();
            cartStore = new CartDaoMongoDB();
            // Conexion a la DB
            await mongoose.connect(MONGO_DB.CONN_STRING);
            console.log("[MONGO] -> Connected.");
            // Get Max Id
            await productsStore.updateMaxId();
            break;

        default:
            console.log("[STORE_DATASOURCE] -> Not matching: ", STORE_DATASOURCE);
            throw new Error("[STORE_DATASOURCE] -> Not matching");
            break;
    }
})();

module.exports = { productsStore, cartStore };