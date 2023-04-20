const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');
const Poll = require('./poll');

class Answer extends Model {
  static async incrementVoteCount(answerId) {
    try {
      const answer = await Answer.findByPk(answerId);
      if (answer) {
        answer.vote_count++;
        await answer.save();
        return answer;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

Answer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vote_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pollId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Answer',
  }
);

Answer.belongsTo(Poll, { foreignKey: 'pollId' });
Poll.hasMany(Answer, { foreignKey: 'pollId' });

module.exports = Answer;
