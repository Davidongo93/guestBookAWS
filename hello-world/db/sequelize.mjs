import { Sequelize } from 'sequelize';

// Configura los valores de tu base de datos
const dbConfig = {
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
};

// Crea una instancia de Sequelize con la configuración
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
  }
);

export default sequelize;
