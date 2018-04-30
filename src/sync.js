const sequelize = require('./connection');
var Product = require('./models/Product');
var Seller = require('./models/Seller');

Seller.sync({force: true}).then(() => {
    console.log('create table Seller')

    Product.sync({force: true}).then(() => {
        console.log('create table Product')

        sequelize.close();
    });
});