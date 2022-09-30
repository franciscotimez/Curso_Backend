const { ContenedorMongo } = require("../../contenedores/contenedorMongo");
const { cartSchema } = require("./cartSchema");

const collectionName = "carts";

class CartDaoMongoDB extends ContenedorMongo {
    constructor() {
        super(collectionName, cartSchema);
    }
}

module.exports = { CartDaoMongoDB };