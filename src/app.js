var _ = require('underscore');
var config = require('./config.js');
var Allegro = require('./libs/allegro');
var Mojepanstwo = require('./libs/mojepanstwo');
var Product = require('./models/Product');
var Seller = require('./models/Seller');

let keywords = config.keywords;
let pageNumber = 1;
let numOfPages = 2;

var getPageInterval = setInterval(() => {
    if (pageNumber < numOfPages) {
        Allegro.getProducts('iphone', pageNumber++)
            .then(function (response) {
                let countItems = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].metadata.Pageable.totalCount;
                let pageSize = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].metadata.Pageable.pageSize;
                numOfPages = Math.ceil(countItems / pageSize);

                let allItems = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].data.items;
                let items = [], itemIndex = 0;
                items = items.concat(allItems.promoted, allItems.regular, allItems.sponsored);

                var getProductInterval = setInterval(function() {console.log(itemIndex);
                    if(items.length > itemIndex + 1) {
                        let item = items[itemIndex++];

                        Product
                            .findOne({
                                where: {product_id: item.id}
                            })
                            .then(product => {
                                if(!product) {
                                    if (item.seller.company) {
                                        let sellerID = item.seller.id;

                                        Allegro.getSellerInfo(sellerID)
                                            .then(response => {
                                                let nip = Allegro.findNip(response.data);

                                                if (nip) {
                                                    Mojepanstwo.getCompanyData(nip)
                                                        .then((response) => {
                                                            if (response.data.Dataobject.length) {
                                                                let krs_podmioty = response.data.Dataobject[0].data;

                                                                Seller
                                                                    .findOne({
                                                                        where: {nip: nip}
                                                                    })
                                                                    .then(seller => {
                                                                        if(seller) {
                                                                            Product.create({
                                                                                product_id: item.id,
                                                                                seller: seller.id,
                                                                                images: JSON.stringify(item.images),
                                                                                url: item.url,
                                                                                name: item.name
                                                                            });
                                                                        } else {
                                                                            Seller
                                                                                .create({
                                                                                    address: krs_podmioty['krs_podmioty.adres'],
                                                                                    registration_ate: krs_podmioty['krs_podmioty.data_rejestracji'],
                                                                                    checkDate: krs_podmioty['krs_podmioty.data_sprawdzenia'],
                                                                                    email: krs_podmioty['krs_podmioty.email'],
                                                                                    krs: krs_podmioty['krs_podmioty.krs'],
                                                                                    nip: krs_podmioty['krs_podmioty.nip'],
                                                                                    regon: krs_podmioty['krs_podmioty.regon'],
                                                                                    www: krs_podmioty['krs_podmioty.www'],
                                                                                    mojepanstwo_url: response.data.Dataobject[0].url,
                                                                                    allegro_username: 'allegro_username'
                                                                                })
                                                                                .then((result) => {
                                                                                    Product.create({
                                                                                        product_id: item.id,
                                                                                        seller: result.id,
                                                                                        images: JSON.stringify(item.images),
                                                                                        url: item.url,
                                                                                        name: item.name
                                                                                    });
                                                                                })
                                                                            ;
                                                                        }
                                                                    })
                                                                ;
                                                            }
                                                        })
                                                        .catch((e) => {
                                                            console.log('Error in get data from KRS');
                                                            console.log(e);
                                                        })
                                                }
                                            })
                                            .catch((e) => {
                                                console.log('Error in get data seller from allegro');
                                                console.log(e);
                                            })
                                        ;
                                    }
                                }
                            })
                        ;
                    } else {
                        clearInterval(getProductInterval);
                    }
                }, 50);
            })
            .catch((e) => {
                console.log('Error in get listing of products');
                console.log(e);
            })
        ;
    } else {
        /*TODO:
        zmiana keywords
        reset zmiennych
         */

        clearInterval(getPageInterval);
    }
    console.log(pageNumber + ":" + numOfPages);
}, 1000);