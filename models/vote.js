const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');
const User = require('./user');
const Poll = require('./poll');
const Answer = require('./answer');

class Vote extends Model {}

Vote.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: User,
        key: 'username',
      },
    },
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Poll,
        key: 'id',
      },
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Answer,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Vote',
  }
);

User.belongsToMany(Poll, { through: Vote, foreignKey: 'userId' });
Poll.belongsToMany(User, { through: Vote, foreignKey: 'pollId' });

module.exports = Vote;
