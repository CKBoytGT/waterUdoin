// Purpose: Establishes connection to database
const Sequelize = require('sequelize');
require('dotenv').config();

// Create connection to our database, pass in your MySQL information for username and password

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);


// port is default according to our mini projects -- tien //
module.exports = sequelize;