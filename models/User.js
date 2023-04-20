const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static async findUser(username, password) {
    try {
      const user = await User.findByPk(username);
      if (user && user.password === password) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
