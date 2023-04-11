const sequelize = require('../config/connection');
// import models
const User = require('../models/User');
const Log = require('../models/Log');

// require the json files for each model's seeds
const userData = require('./userData.json');
const logData = require('./logData.json');

const seedDatabase = async () => {

  // sync with sequelize
  await sequelize.sync({ force: true });

  // add users with hooks
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });

  console.log('\n---- USERS SEEDED ----\n');

  // add logs
  await Log.bulkCreate(logData);

  console.log('\n---- LOGS SEEDED ----\n');

  await sequelize.close();

};

seedDatabase();
