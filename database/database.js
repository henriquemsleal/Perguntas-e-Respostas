const { Sequelize } = require('sequelize');
const connection = new Sequelize('guiaperguntas', 'root', '018930', {
	host: 'localhost',
	dialect: 'mysql',
});

module.exports = connection;
