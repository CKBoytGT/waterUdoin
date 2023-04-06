require('dotenv').config();

const express = require('express');
/*
in progress
const routes = require('./controllers');
*/
const sequelize = require('./config/connection');


// Initiate express
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
// in progress //
/*
app.use(routes);
*/

// Start the server after establishing a connection to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});


// testing dotenv by console.log // -- Tien
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);