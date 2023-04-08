const User = require('./User');
const Log = require('./Log');

User.hasMany(Log, {
  foreignKey: 'user_id'
});

Log.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User,
  Log };
