const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handler
app.use(routes);

// Sync sequelize models to the database, then start the server
sequelize.sync({ force: process.env.FORCE_SYNC === 'true' }).then(() => {
  // This allows you to control whether the database should be reset based on an environment variable (FORCE_SYNC). This is useful because you may not always want to drop and recreate your tables every time you start the server.
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
}).catch((err) => {
  console.error('Failed to sync database:', err);
});
