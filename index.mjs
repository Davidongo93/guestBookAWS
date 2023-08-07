import app from './app/app.mjs';
import { conn } from './app/db.mjs';

// Sincroniza la definición del modelo con la base de datos.
(async () => {
  try {
    await conn.sync(); // Esta función sincroniza el modelo con la base de datos.
    console.log('Database connected and tables synced.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

// Exporta la aplicación de Express y la instancia de Sequelize.
export default {
  app,
  conn,
};
