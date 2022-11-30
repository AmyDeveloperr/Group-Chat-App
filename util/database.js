const Sequelize = require('sequelize');

const sequelize = new Sequelize('group-chat', 'root', 'Simba12$', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;