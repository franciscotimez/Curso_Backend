import express from 'express';
const router = express.Router();

import { productos as productsStore } from '../store/indexContenedor.js';

// Obtiene todos los productos
router.get('', async (req, res) => {
  const products = await productsStore.getAll();
  res.json(products);
});

// Obtiene un producto por su :id
router.get('/:id', async ({ params }, res) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return res.json({ error: 'El parametro no es un numero' });
  }

  const product = await productsStore.getById(id);
  console.log(product);
  if (product) {
    return res.json(product);
  }
  return res.json({ error: 'Producto no encontrado' });
});

// Crea un producto datos en el body
router.post('', async ({ body }, res) => {
  const { title, price, thumbnail } = body;
  const priceParsed = parseFloat(price);
  if (isNaN(priceParsed)) {
    return res.json({ error: 'El precio no es un numero' });
  }
  const newProduct = await productsStore.save({ title, price: priceParsed, thumbnail });
  console.log(newProduct);
  return res.json(newProduct);
});

// Actualiza un producto por su :id y datos en el body
router.put('/:id', async ({ params, body }, res) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return res.json({ error: 'El parametro no es un numero' });
  }
  const { title, price, thumbnail } = body;
  const priceParsed = parseFloat(price);
  if (isNaN(priceParsed)) {
    return res.json({ error: 'El precio no es un numero' });
  }

  const productExist = await productsStore.getById(id);
  if (productExist) {
    const product = await productsStore.update(id, { title, price: priceParsed, thumbnail });
    console.log(product);
    return res.json(product);
  }
  return res.json({ error: 'Producto no encontrado' });
});

// Elimina un producto por su :id
router.delete('/:id', async ({ params }, res) => {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    return res.json({ error: 'El parametro no es un numero' });
  }

  const productExist = await productsStore.getById(id);
  if (productExist) {
    const message = await productsStore.deleteById(id);
    return res.json({ msg: message });
  }
  return res.json({ error: 'Producto no encontrado' });
});

export {
  router,
  productsStore
};
