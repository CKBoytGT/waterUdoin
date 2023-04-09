const { Model, DataTypes } = require('sequelize');

const sequelize = require('./config/connnection');

class Log extends Model {}

Log.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      min: 0
    },
  },
 
},
{
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'log'
}

);

module.exports = Log;
