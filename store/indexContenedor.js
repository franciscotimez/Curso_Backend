import { Contenedor } from './contenedor.js';
import { ContenedorMensajes } from './contenedorMensajes.js';

import { ContenedorDB } from './ContenedorDB.js';
import { tableCreator } from './db/tableCreator.js';

import { configMariaDb, configSQlite3 } from './db/dbConfig.js';

import { productSchema } from './db/productSchema.js';
const tableNameProducts = 'products';

import { messageSchema } from './db/messageSchema.js';
const tableNameMessages = 'messages';

let productos;
let mensajes;

(async () => {
    productos = new Contenedor("./products.json");
    mensajes = new ContenedorMensajes("./mensajes.json");

    // Crea Tabla Productos
    // tableCreator(configMariaDb, tableNameProducts, productSchema);
    // productos = new ContenedorDB(configMariaDb, tableNameProducts);

    // Crea Tabla Mensajes 
    // tableCreator(configSQlite3, tableNameMessages, messageSchema);
    // productos = new ContenedorDB(configSQlite3, tableNameMessages);

})();

export { productos, mensajes };