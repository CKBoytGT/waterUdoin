const User = require('./User');
const Log = require('./Log');

Log.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User,
  Log };
