import express from 'express';
const router = express.Router();

import { productsStore } from './productos.js';

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('index', {
      userEmail: req.user.email,
      userName: req.user.email,
      userLastname: "req.session.lastname",
      userAge: "req.session.age",
      userAlias: "req.session.alias",
      userAvatar: "req.session.avatar"
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
  return res.render('login', {});
});

router.get('/loginfail', (req, res, next) => {
  return res.render('loginfail', {});
});

router.get('/register', (req, res, next) => {
  return res.render('register', {});
});

router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        res.redirect("/login");
      }
      else {
        req.session.destroy();
        res.render('logout', {});
      }
    });
  }
  else {
    res.redirect("/login");
  }
});

export default router;
