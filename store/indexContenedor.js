const { Contenedor } = require('./contenedor');

let productos;
let mensajes;

(async () => {
    productos = new Contenedor("./products.json");
    mensajes = new Contenedor("./mensajes.json");
    console.log("load json file");
})();

module.exports = { productos, mensajes };