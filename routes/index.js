var express = require('express');
var router = express.Router();

const { productsStore } = require('./productos');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {});
});

router.get('/productos', async (req, res, next) => {
  const products = await productsStore.getAll();
  res.render('products', {
    products,
    listExists: products.length > 0
  });
});

module.exports = router;
