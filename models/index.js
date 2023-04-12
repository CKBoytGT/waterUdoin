const User = require('./User');
const Log = require('./Log');

User.hasMany(Log, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Log.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User,
  Log };
