import { createUser } from './controller.mjs';
import { User } from './models/user.mjs';

export const lambdaHandler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://davidongo93.github.io',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
  };

  try {
    if (event.httpMethod === 'GET' && event.path === '/') {
      // Manejo de la solicitud GET en la ruta "/"
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Hello, world!',
        }),
        headers,
      };
    } else if (event.httpMethod === 'POST' && event.path === '/users') {
      // Manejo de la solicitud POST en la ruta "/users"
      const requestBody = JSON.parse(event.body);
      const { name, email, phone, message } = requestBody;

      await createUser(name, email, phone, message);

      return {
        statusCode: 200,
        body: JSON.stringify(requestBody),
        headers,
      };
    } else {
      // Manejo de otras rutas o métodos no definidos
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Not Found',
        }),
        headers,
      };
    }
  } catch (err) {
    console.log(err);

    if (err.name === 'SequelizeValidationError') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Validation Error',
          errors: err.errors.map((error) => error.message),
        }),
        headers,
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
      headers,
    };
  }
};
