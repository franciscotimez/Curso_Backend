const express = require('express');
const router = express.Router();

const { productsStore } = require('../store/storeContenedores');
const { normalizeProduct } = require('./helpers/product');

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
  if (product) {
    return res.json(product);
  }
  return res.json({ error: 'Producto no encontrado' });
});

// Crea un producto datos en el body
router.post('', async ({ body }, res) => {
  try {
    delete body.id;
    delete body.timestamp;
    const newProduct = await productsStore.save(normalizeProduct(body));
    res.status(201);
    return res.json(newProduct);
  } catch (error) {
    return res.json({ error: error.message });
  }
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
    return res.json({ error: 'Producto no encontrado' });
  } catch (error) {
    return res.json({ error: error.message });
  }
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

module.exports = {
  router,
  productsStore
};
