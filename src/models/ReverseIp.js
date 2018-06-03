const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Seller = require('./Seller');

const ReverseIp = sequelize.define('reverse_ip', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seller: {
        type: Sequelize.INTEGER,
        references: {
            model: Seller,
            key: 'id'
        }
    },
    server_ip: {
        type: Sequelize.STRING
    },
    domain: {
        type: Sequelize.STRING
    }
});

module.exports = ReverseIp;