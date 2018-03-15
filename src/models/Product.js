const Sequelize = require('sequelize');
const sequelize = require('../connection');
const Seller = require('./Seller');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seller_id: {
        type: Sequelize.INTEGER,
        references: {
            model: Seller,
            key: 'id'
        }
    },
    product_id: {
        type: Sequelize.BIGINT
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    url: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    images: {
        type: Sequelize.TEXT,
        allowNull: true
    },
});

module.exports = Product;