const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const TodoDetail = sequelize.define('todo',{
    id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    todo:{
      type: Sequelize.STRING
    },
    description:{
      type: Sequelize.STRING,
      allowNull: false
    }
})

module.exports = TodoDetail