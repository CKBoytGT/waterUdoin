// Users //
// fixing models -- i think it was a typo for connection //
const connection = require('../config/connection.js');
// const User import to models/User.js //
const User = require('../models/User');
// const Log import to models/Log.js //
const Log = require('../models/Log');

// let name our const as seedDatabase to seed the database with user and log data then force the recreation of the tables if exist//
const seedDatabase = async () => {
    await connection.sync({ force: true });

// using bulkCreate method to create multiple instances of the User and Log model in one call //
const users = await User.bulkCreate([
    {
        username: 'user1',
        email: 'test1@gmail.com',
        password: 'password1',
        // maybe water_goal: value //
        // adding more depends on the models //
        water_goal: 1000,
        
    },
    {
        username: 'user2',
        email: 'test2@gmail.com',
        password: 'password2',
        // maybe water_goal: value //
        water_goal: 2000,
    },
]);
// console.log to see if the users are being created //
console.log('\n----- USERS SEEDED -----\n');

// seeing if the logs are being created to show current date and time //

const logs = await Log.bulkCreate([
    { amount: 500, date: new Date().toString(), user_id: users[0].get('id') },
    
  ]);

// console.log to see if the logs are being created //
  console.log('\n----- LOGS SEEDED -----\n');
// line closes after the logs are created //
await connection.close();
};
// call it! //
seedDatabase();

