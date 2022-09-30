const { contenedorFirebase } = require("../../contenedores/contenedorFirebase");

const collectionName = "products";

class ProductsDaoFirebase extends contenedorFirebase {
    constructor(db) {
        super(db, collectionName);
    }
}

module.exports = { ProductsDaoFirebase };
