const { Contenedor } = require('./contenedor');

let productos;

(async () => {
    productos = new Contenedor("./products.json");
    console.log("load json file");
})();

module.exports = productos;