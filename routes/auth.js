import express from 'express';
import passport from 'passport';
const router = express.Router();

// Obtiene todos los productos
router.post(
  '/register',
  passport.authenticate('register', {
    successRedirect: '/',
    failureRedirect: '/loginfail'
  })
);

router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/loginfail'
  })
);

export { router };