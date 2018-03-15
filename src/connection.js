var mysql = require('mysql');
var MYSQL = require('./config.js').MYSQL;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(MYSQL.database, MYSQL.user, MYSQL.password, {
    host: MYSQL.host,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;