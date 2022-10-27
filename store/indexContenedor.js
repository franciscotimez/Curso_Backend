import { Contenedor } from './contenedor.js';
import { ContenedorMensajes } from './contenedorMensajes.js';

import { ContenedorDB } from './ContenedorDB.js';
import { tableCreator } from './db/tableCreator.js';

import { configMariaDb, configSQlite3 } from './db/dbConfig.js';

import { productSchema } from './db/productSchema.js';
const tableNameProducts = 'products';

import { messageSchema } from './db/messageSchema.js';
import { UsersDaoMongoDB } from './daos/UsersDaoMongoDB.js';
import mongoose from 'mongoose';
import { config } from '../config.js';

const tableNameMessages = 'messages';

let productos;
let mensajes;
let usersStore;


(async () => {
    productos = new Contenedor("./products.json");
    mensajes = new ContenedorMensajes("./mensajes.json");

    // Crea Tabla Productos
    // tableCreator(configMariaDb, tableNameProducts, productSchema);
    // productos = new ContenedorDB(configMariaDb, tableNameProducts);

    // Crea Tabla Mensajes 
    // tableCreator(configSQlite3, tableNameMessages, messageSchema);
    // productos = new ContenedorDB(configSQlite3, tableNameMessages);

    usersStore = new UsersDaoMongoDB();
    // Conexion a la DB
    console.log("[MONGO] -> Connecting to: ", config.MONGO_URL);
    await mongoose.connect(config.MONGO_URL);
    console.log("[MONGO] -> Connected.");
    // Get Max Id
    await usersStore.updateMaxId();
})();

export { productos, mensajes, usersStore };