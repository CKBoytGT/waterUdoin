// re-editing seeds.js to use userData.json //
const sequelize = require('../config/connection');
const User = require('../models/User');
// const Log import to models/Log.js //
const Log = require('../models/Log');

// let name our const as seedDatabase to seed the database with user and log data then force the recreation of the tables if exist//
const userData = require('./userData.json');
const logData = require('./logData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });




    const createdUsers = await User.findAll(); // Query the created users

    // create an array to store the log creation as promises
    const logPromises = [];
    // loops for the current log entry being processed.
    logData.forEach((log) => {
        // find the user that matches the username on the log //
        const user = createdUsers.find((user) => user.username === log.username);
    
        if (user) {
            // showing entry inserted for the users //
            console.log(`Inserting log for user ${user.username}:`, log);
            logPromises.push(
                Log.create({
                    ...log,
                    user_id: user.id,
                })
            );
        }
    });
    // after the loop is done, the logPromise array will be filled with promises that will be resolved when the log is created //
    await Promise.all(logPromises);

    console.log('\n---- USERS SEEDED ----\n');
    console.log('\n---- LOGS SEEDED ----\n');

    await sequelize.close();
};

// call it! //
seedDatabase();

