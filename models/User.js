const sequelize = require('../db');
const bcrypt = require('bcrypt')
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static async findUser(username, password) {
    try {
      const user = await User.findByPk(username);
      bcrypt.compare(password, user.password, function(err, result) {
        if (result) {
          return user;
        } else {
          return null;
        }
      })
    }
    catch(err) {
      console.log(err)
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
