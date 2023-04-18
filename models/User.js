const sequelize = require('../db')
const {Model, DataTypes} = require('sequelize')

class User extends Model {

    static async findUser(username, password) {
        try {
            const user = await User.findByPk(username)
            if (user && user.password === password) {
                return user
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
}

User.init({
    // Model attributes are defined here
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    continent: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
  });

module.exports = User