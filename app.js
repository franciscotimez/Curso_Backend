import { normalizePort, onError } from './helpers/helpers.js';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import { router as productsRouter, productsStore } from './routes/productos.js';
import { router as productsTestRouter } from './routes/productos-test.js';

import http from 'http';
import { Server } from "socket.io";

const app = express();

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);
const io = new Server(server);

import { mensajes } from './store/indexContenedor.js';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/productos', productsRouter);
app.use('/api/productos-test', productsTestRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let messagesContainer = [];
// Socket.io Events
io.on('connection', async (socket) => {
  console.log('a user connected');
  const products = await productsStore.getAll();
  socket.emit('products-channel', products);

  socket.on("newProduct-channel", (data) => {
    console.log("Recibido: ", data);
    io.emit('newProduct-channel', data);
  });

  socket.on("newMessage-channel", async (data) => {
    console.log("Recibido: ", data);
    await mensajes.save(data);
    messagesContainer = [...messagesContainer, data];
    io.emit('newMessage-channel', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(port);
server.on('error', onError);
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});

