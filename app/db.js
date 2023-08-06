const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const DB_DEPLOY = "postgresql://postgres:wJukwqzDPnKv2CmyReXd@containers-us-west-115.railway.app:7699/railway"
// Instantiating Sequelize
const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
});

// Define el modelo para la tabla 'GuestBook'
const GuestBook = sequelize.define('GuestBook', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = sequelize;
