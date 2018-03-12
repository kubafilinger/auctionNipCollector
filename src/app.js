var _ = require('underscore');
var mysql = require('mysql');
var config = require('./config.js');
var MYSQL = config.MYSQL;
var Allegro = require('./libs/allegro');
var Mojepanstwo = require('./libs/mojepanstwo');
var Seller = require('./obj/Seller');
var Product = require('./obj/Product');

var con = mysql.createConnection({
    host: MYSQL.host,
    user: MYSQL.user,
    password: MYSQL.password,
    database: MYSQL.database
});

con.connect(function(err) {
    if (err) throw err;
});

let keywords = config.keywords;

_.each(keywords, (key) => {
    for (let pageNumber = 1; pageNumber < 2; pageNumber++) {
        Allegro.getProducts(key, pageNumber)
            .then(function (response) {
                let countItems = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].metadata.Pageable.totalCount;
                let pageSize = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].metadata.Pageable.pageSize;
                const numOfPages = Math.ceil(countItems / pageSize);

                //TODO: wykozystac info o ilosci stron

                let allItems = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].data.items;
                let sponsoredItems = allItems.sponsored;
                let promotedItems = allItems.promoted;
                let regularItems = allItems.regular;

                _.each(promotedItems, function (item) {
                    if (item.seller.company) {
                        let sellerID = item.seller.id;

                        Allegro.getSellerInfo(sellerID)
                            .then(response => {
                                let nip = Allegro.findNip(response.data);

                                if(nip) {
                                    Mojepanstwo.getCompanyData(nip)
                                        .then((response) => {
                                            if (response.data.Dataobject.length) {
                                                let krs_podmioty = response.data.Dataobject[0].data;
                                                let seller = new Seller;

                                                seller.address = krs_podmioty['krs_podmioty.adres'];
                                                seller.registrationDate = krs_podmioty['krs_podmioty.data_rejestracji'];
                                                seller.checkDate = krs_podmioty['krs_podmioty.data_sprawdzenia'];
                                                seller.email = krs_podmioty['krs_podmioty.email'];
                                                seller.krs = krs_podmioty['krs_podmioty.krs'];
                                                seller.nip = krs_podmioty['krs_podmioty.nip'];
                                                seller.regon = krs_podmioty['krs_podmioty.regon'];
                                                seller.www = krs_podmioty['krs_podmioty.www'];
                                                seller.mojepanstwoUrl = response.data.Dataobject[0].url;
                                                seller.allegroUsername = 'allegro_username';

                                                seller.save(con)
                                                    .then((result) => {
                                                        console.log('save seller');

                                                        let product = new Product;

                                                        product.productId = item.id;
                                                        product.sellerId = result.insertId;
                                                        product.images = JSON.stringify(item.images);
                                                        product.url = item.url;
                                                        product.name = item.name;

                                                        product.save(con)
                                                            .then((result) => {
                                                                console.log('save product');
                                                            })
                                                            .catch((err) => {
                                                                console.log(err);
                                                            })
                                                    })
                                                    .catch((err) => {
                                                        console.log(err);
                                                    })
                                            }
                                        })
                                        .catch((err) => {
                                            console.log('Error in get data from KRS');
                                            console.log(err);
                                        })
                                }
                            })
                            .catch((e) => {
                                console.log('Error in get data seller from allegro');
                                //console.log(e);
                            })
                        ;
                    }
                })
            })
            .catch((e) => {
                console.log('Error in get listing of products');
                //console.log(e);
            })
        ;
    }
});