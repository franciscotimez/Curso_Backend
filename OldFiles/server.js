import express from 'express';

const port = 8080;

const app = express();

import indexRouter from './src/routes/indexRoutes';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/productos', indexRouter);

// let productos;

// (async () => {
//     productos = new Contenedor("./products.json");
// })();

// // array de todos los productos
// app.get('/productos', async (req, res) => {
//     console.log("Hola Productos");
//     let data = await productos.getAll();
//     res.json(data);
// });

// // Un producto al azar
// app.get('/productoRandom', async (req, res) => {
//     let randomId = Math.floor(Math.random() * productos.lastId) + 1;
//     let randomProduct = await productos.getById(randomId);
//     res.json(randomProduct);
// });

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

server.on('error', err => console.error(`Error en el servidor ${err}`));