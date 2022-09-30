const { contenedorFirebase } = require("../../contenedores/contenedorFirebase");

const collectionName = "carts";

class CartDaoMongoFirebase extends contenedorFirebase {
    constructor(db) {
        super(db, collectionName);
    }
}

module.exports = { CartDaoMongoFirebase };