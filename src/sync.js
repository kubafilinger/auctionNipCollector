const sequelize = require('./connection');
var Product = require('./models/Product');
var Seller = require('./models/Seller');
var ReverseIp = require('./models/ReverseIp');

Seller.sync({force: true}).then(() => {
    console.log('create table Seller')

    Product.sync({force: true}).then(() => {
        console.log('create table Product')
    })

    ReverseIp.sync({force: true}).then(() => {
        console.log('create table ReverseIp')
    })

    sequelize.close();
});