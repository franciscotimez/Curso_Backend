import express from 'express';
const router = express.Router();

import { faker } from '@faker-js/faker';

// Obtiene todos los productos
router.get('', async (req, res) => {
  let products = [];
  for (let index = 1; index <= 5; index++) {
    products.push({
      id: index,
      title: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      thumbnail: faker.image.imageUrl(),
    });
  }
  // const products = await productsStore.getAll();
  res.json(products);
});

export { router };
