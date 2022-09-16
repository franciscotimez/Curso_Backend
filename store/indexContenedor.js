const { Contenedor } = require('./contenedor');

const { ContenedorDB } = require('./ContenedorDB');
const { tableCreator } = require('./db/tableCreator');

const { configMariaDb, configSQlite3 } = require('./db/dbConfig');

const { productSchema } = require('./db/productSchema');
const tableNameProducts = 'products';

const { messageSchema } = require('./db/messageSchema');
const tableNameMessages = 'messages';

let productos;
let mensajes;

(async () => {
    // productos = new Contenedor("./products.json");
    // mensajes = new Contenedor("./mensajes.json");

    // Crea Tabla Productos
    tableCreator(configMariaDb, tableNameProducts, productSchema);
    productos = new ContenedorDB(configMariaDb, tableNameProducts);

    // Crea Tabla Mensajes 
    tableCreator(configSQlite3, tableNameMessages, messageSchema);
    productos = new ContenedorDB(configSQlite3, tableNameMessages);

})();

module.exports = { productos, mensajes };