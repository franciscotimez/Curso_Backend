import express from 'express';
const router = express.Router();

import { productsStore } from './productos.js';

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(`---> Session ID: ${req.session.name}`);
  if (req.session.name) {
    res.render('index', {
      userEmail: req.session.email,
      userName: req.session.name,
      userLastname: req.session.lastname,
      userAge: req.session.age,
      userAlias: req.session.alias,
      userAvatar: req.session.avatar
    });
  }
  else {
    res.redirect("/login");
  }
});

router.get('/productos', async (req, res, next) => {
  const products = await productsStore.getAll();
  res.render('products', {
    products,
    listExists: products.length > 0
  });
});

router.get('/login', (req, res, next) => {
  const { email, name, lastname, age, alias, avatar } = req.query;
  console.log({ query: req.query });

  if (!req.session.name && !name) {
    console.log(`---> NO HAY USUARIO`);
    return res.render('login', {});
  }
  else {
    if (name) {
      req.session.email = email;
      req.session.name = name;
      req.session.lastname = lastname;
      req.session.age = age;
      req.session.alias = alias;
      req.session.avatar = avatar;
    }
    console.log(`---> El Usuario es: ${name} o ${req.session.name}`);
    return res.redirect("/");
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.render('logout', {});
});

export default router;
