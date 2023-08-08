// controller.js
import { User } from './models/user.mjs'

export const createUser = async (name, email, phone, message) => {
  try {
    // Inserta el usuario en la base de datos utilizando el modelo User
    const user = await User.create({ name, email, phone, message });

    return user; // Retorna el objeto del usuario creado con el UUID generado automáticamente
  } catch (err) {
    console.error('Error inserting user:', err);
    throw err;
  }
};

