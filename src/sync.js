var Product = require('./models/Product');
var Seller = require('./models/Seller');



Seller.sync({force: true}).then(() => {
    console.log('create table Seller')

    Seller.create({
        nip: "12321312"
    }).then(() => {
        Product.sync({force: true}).then(() => {
            console.log('create table Product')

            Product.create({
                name: 'lolek',
                seller_id: 1,
                product_id: 123,
                url: 'adasda',
                images: 'lalal',
            });
        });
    });
});