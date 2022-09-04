const { Contenedor } = require('./contenedor');

let productsStore;
let cartStore;

(async () => {
    productsStore = new Contenedor("./productsStore.json");
    cartStore = new Contenedor("./cartStore.json");
    console.log("load json file");
})();

module.exports = { productsStore, cartStore };