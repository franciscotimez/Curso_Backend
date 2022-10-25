
import passport from "passport";

import { usersStore } from "../store/indexContenedor.js"; //getbyid

import { registerLocal, loginLocal } from './passportStrategies.js';

passport.use('register', registerLocal);
passport.use('login', loginLocal);

export const passportMiddleware = passport.initialize();

// 
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersStore.getById(id.id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
// 

export const passportSessionHandler = passport.session();