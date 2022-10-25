import { Strategy } from "passport-local";
import { authenticateUser, registerUser } from "../helpers/userHelper.js";

export const registerLocal = new Strategy({
  passReqToCallback: true,
  usernameField: 'email',
  // passwordField: 'pass'
},
  async (req, username, password, done) => {
    try {
      const usuario = await registerUser(req.body);
      done(null, usuario);
    } catch (error) {
      done(null, false, error);
    }
  }
);


export const loginLocal = new Strategy({
  usernameField: 'email',
  // passwordField: 'pass'
},
  async (username, password, done) => {
    try {
      const usuario = await authenticateUser(username, password);
      done(null, usuario);
    } catch (error) {
      done(null, false, error);
    }
  }
);
