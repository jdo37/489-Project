const { Sequelize } = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/db1.sqlite'
})

module.exports = sequelize