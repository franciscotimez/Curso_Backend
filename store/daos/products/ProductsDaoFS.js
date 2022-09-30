const { ContenedorFS } = require('../../contenedores/contenedorFS');

class ProductsDaoFS extends ContenedorFS {
    constructor() {
        super("./productsStore.json");
    }

    async disconect() {
    }
}

module.exports = { ProductsDaoFS };
