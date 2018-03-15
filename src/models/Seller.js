const Sequelize = require('sequelize');
const sequelize = require('../connection');

const Seller = sequelize.define('seller', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    registration_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    check_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
    },
    krs: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    regon: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    www: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    mojepanstwo_url: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    allegro_username: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    nip: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    company: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
    },
});

module.exports = Seller;