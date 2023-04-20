const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Poll extends Model {}

Poll.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Poll',
  }
);

module.exports = Poll;