const express = require('express');
const router = express.Router();

const { cartStore } = require('../store/storeContenedores');
const { productsStore } = require('../store/storeContenedores');
const { normalizeCart } = require('./helpers/cart');

// Obtiene todos los productos
router.get('', async (req, res) => {
  const products = await productsStore.getAll();
  res.json(products);
});

// Obtiene los productos de un cart por :id
router.get('/:id/products', async ({ params }, res) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return res.json({ error: 'El parametro no es un numero' });
  }

  const cart = await cartStore.getById(id);
  if (cart) {
    return res.json(cart.products);
  }
  return res.json({ error: 'Cart not found' });
});

// Crea un carrito
router.post('', async ({ body }, res) => {
  try {
    const newCart = await cartStore.save(normalizeCart({}));
    res.status(201);
    return res.json(newCart);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

// Agrega un producto al carrito
router.post('/:id/products', async ({ params, body }, res) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return res.json({ error: 'El parametro no es un numero' });
  }

  const cartExist = await cartStore.getById(id);
  if (cartExist) {
    const productExist = await productsStore.getById(body.product_id);
    if (productExist) {
      cartExist.products = [...cartExist.products, productExist]
      const cart = await cartStore.update(id, normalizeCart(cartExist));
      return res.json(cart);
    }
    return res.json({ error: 'Product not found' });
  }
  return res.json({ error: 'Cart not found' });
});

// Actualiza un producto por su :id y datos en el body
router.put('/:id', async ({ params, body }, res) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return res.json({ error: 'El parametro no es un numero' });
  }

  try {
    delete body.id;
    const productExist = await productsStore.getById(id);
    if (productExist) {
      const product = await productsStore.update(id, normalizeProduct({ ...productExist, ...body }));
      return res.json(product);
    }
    return res.json({ error: 'Cart not found' });
  } catch (error) {
    return res.json({ error: error.message });
  }
});

// Elimina un carrito por su :id
router.delete('/:id', async ({ params }, res) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return res.json({ error: 'El parametro no es un numero' });
  }

  const cartExist = await cartStore.getById(id);
  if (cartExist) {
    const message = await cartStore.deleteById(id);
    return res.json({ msg: message });
  }
  return res.json({ error: 'Cart not found' });
});

module.exports = {
  router
};
