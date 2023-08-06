const server = require('./app/app.js');
const { conn } = require('./app/db.js');

const PORT = 3001;

// Syncing all the models at once.
conn.sync({force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`AWS listening at ${PORT}`); // eslint-disable-line no-console
  });
});