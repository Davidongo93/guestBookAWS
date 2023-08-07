import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpress from 'aws-serverless-express';
import routes from './routes/index.mjs';

const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/', routes);
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Configura Sequelize y otras dependencias para interactuar con PostgreSQL.
// ...

// Importa tus rutas desde userRoutes.mjs o cualquier otro archivo de rutas que crees.
// app.use('/users', require('./app/routes/userRoutes.mjs'));

const server = awsServerlessExpress.createServer(app);

export default server;
