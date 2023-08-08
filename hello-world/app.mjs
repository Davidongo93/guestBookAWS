/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
import { createUser } from './controller.mjs';
import { User } from './models/user.mjs';

export const lambdaHandler = async (event, context) => {
  try {
    if (event.httpMethod === 'GET' && event.path === '/') {
      // Manejo de la solicitud GET en la ruta "/"
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Hello, world!',
        }),
        headers: {
          'Access-Control-Allow-Origin': 'https://davidongo93.github.io', // Permitir cualquier origen, actualiza esto con tus dominios permitidos en producción
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
      };
    } else if (event.httpMethod === 'POST' && event.path === '/users') {
      // Manejo de la solicitud POST en la ruta "/users"
      // Aquí puedes acceder a los datos del cuerpo de la solicitud utilizando event.body
      // Por ejemplo, si el cuerpo de la solicitud es un JSON con las propiedades name, email, phone y message:
      const requestBody = JSON.parse(event.body);
      const { name, email, phone, message } = requestBody;

      // Llama al controlador para insertar el usuario en la base de datos
      await createUser(name, email, phone, message);

      // Devuelve el objeto que recibiste en el cuerpo de la solicitud POST
      return {
        statusCode: 200,
        body: JSON.stringify(requestBody),
        headers: {
          'Access-Control-Allow-Origin': 'https://davidongo93.github.io', // Permitir cualquier origen, actualiza esto con tus dominios permitidos en producción
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
      };
    } else {
      // Manejo de otras rutas o métodos no definidos
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: 'Not Found',
        }),
        headers: {
          'Access-Control-Allow-Origin': 'https://davidongo93.github.io',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
      };
    }
  } catch (err) {
    console.log(err);

    // Verifica si el error es una excepción de validación de Sequelize
    if (err.name === 'SequelizeValidationError') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Validation Error',
          errors: err.errors.map((error) => error.message),
        }),
        headers: {
          'Access-Control-Allow-Origin': 'https://davidongo93.github.io',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
      };
    }

    // Para otros errores, devuelve un error de servidor interno (código 500)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
      }),
      headers: {
        'Access-Control-Allow-Origin': 'https://davidongo93.github.io',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      },
    };
  }
};
