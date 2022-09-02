const { normalizePort, onError, onListening } = require('./helpers/helpers');
const createError = require('http-errors');
var debug = require('debug')('proyectoexpress:server');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const { router: productsRouter, productsStore } = require('./routes/productos');

const http = require('http');
const { Server } = require("socket.io");

const app = express();

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);
const io = new Server(server);

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

// Socket.io Events
io.on('connection', async (socket) => {
  console.log('a user connected');
  const products = await productsStore.getAll();
  socket.emit('products-channel', products);

  socket.on("newProduct-channel", (data) => {
    console.log("Recibido: ", data);
    io.emit('newProduct-channel', data);
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
  debug('Listening on ' + bind);
});

