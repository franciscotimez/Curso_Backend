const { ContenedorFS } = require('../../contenedores/contenedorFS');

class CartDaoFS extends ContenedorFS {
    constructor() {
        super("./cartStore.json");
    }

    async disconect() {
    }
}

module.exports = { CartDaoFS };