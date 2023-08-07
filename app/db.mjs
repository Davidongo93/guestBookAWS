import { Sequelize } from 'sequelize';
import usersModel from './models/users.mjs'; // Importa el módulo users.mjs

const DB_DEPLOY = "postgresql://postgres:wJukwqzDPnKv2CmyReXd@containers-us-west-115.railway.app:7699/railway";

// Instantiating Sequelize
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

 export const Users = usersModel(sequelize);
export const conn = sequelize;
