import express from 'express';
const router = express.Router();

import { productsStore } from './productos.js';

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

export default router;
