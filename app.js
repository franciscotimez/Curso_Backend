const { normalizePort, onError } = require('./helpers/helpers');
const { normalizeProduct } = require('./routes/helpers/product');
const { normalizeCart } = require('./routes/helpers/cart');
const createError = require('http-errors');
var debug = require('debug')('proyectoexpress:server');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import Routers
const indexRouter = require('./routes/index');
const { router: productsRouter, productsStore } = require('./routes/products');

const http = require('http');

const app = express();

const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

const server = http.createServer(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Link routers
app.use('/', indexRouter);
app.use('/api/products', productsRouter);

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

server.listen(port);
server.on('error', onError);
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
});

const prod1 = normalizeProduct({
  id: 123,
  name: "Escruadar",
  description: "Uasdanosdn",
  code: 15654,
  image: "http://asdlbalsd",
  price: 2342.23,
  stock: 4,
});

const prod2 = normalizeProduct({
  id: 12346,
  timestamp: 1662295098439,
  name: "regla",
  description: "Uasdanosdn",
  code: 765,
  image: "http://afsaqe",
  price: 654,
  stock: 2,
});

const cart1 = normalizeCart({
  id: 12346,
  products: [
    prod1,
    prod2,
  ]
});

console.log(cart1);