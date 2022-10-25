import { usersStore } from "../store/indexContenedor.js";
import bcrypt from 'bcryptjs';

export const registerUser = async (user) => {
  const { email, password } = user;

  // Encrypt pass
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = await usersStore.save({ email, password: hashedPassword });

  return newUser;
};

export const authenticateUser = async (email, password) => {
  let userSaved;
  try {
    userSaved = await usersStore.getByEmail(email);
    const validPassword = bcrypt.compareSync(password, userSaved.password);
    if (validPassword) {
      delete userSaved.password
      return userSaved;
    }
    throw new Error('Error de autenticacion');
  } catch (error) {
    throw new Error('Error de autenticacion');
  }
  // Confirmar pass
};
