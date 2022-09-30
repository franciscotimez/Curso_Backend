const { ContenedorMongo } = require("../../contenedores/contenedorMongo");
const { productSchema } = require("./productSchema");

const collectionName = "products";

class ProductsDaoMongoDB extends ContenedorMongo {
    constructor() {
        super(collectionName, productSchema);
    }
}

module.exports = { ProductsDaoMongoDB };
