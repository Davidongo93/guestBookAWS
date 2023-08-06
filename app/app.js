const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const awsServerlessExpress = require('aws-serverless-express');
const routes = require('./routes/index.js');

const app = express();

app.name = 'API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use('/', routes);
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Configura Sequelize y otras dependencias para interactuar con PostgreSQL.
// ...

// Importa tus rutas desde userRoutes.js o cualquier otro archivo de rutas que crees.
// app.use('/users', require('./app/routes/userRoutes'));

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};
