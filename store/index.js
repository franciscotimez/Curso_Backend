const { ContenedorFS } = require('./contenedores/contenedorFS');

let productsStore;
let cartStore;

(async () => {
    productsStore = new ContenedorFS("./productsStore.json");
    cartStore = new ContenedorFS("./cartStore.json");
    console.log("load json file");
})();

module.exports = { productsStore, cartStore };