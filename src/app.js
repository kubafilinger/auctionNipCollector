// Collector
//TODO: OK pobrac zawartosc wyszukiwarki na allegro i dostac sie do zmiennej window.costam z JSONem
//TODO: OK wyszukac w jsonie numery ID sprzedawcow
//TODO: OK Po id sprzedawcy odwolac sie do kolejnego url ktorym pobieramy dane sprzedawcy
//TODO: OK Znalezć numer NIP i odpowiednio obrobic (do postaci samych liczb)
//TODO: OK Pobrac zawartosc KRS z odpowiedniego URL (z zawartym nip) i odnalesc link do info o nipie
//TODO: Po pobraniu storny pod tym linkiem, wyszukanie najwazniejszych info (daty i etc)
//TODO: Zapisanie wszystkoego do bazy danych

//Bazadanych
//TODO: zaprojektowac schemat tabeli bazy danych

var axios = require('axios');
var _ = require('underscore');
var mysql = require('mysql');
var config = require('./config.js');
var MYSQL = config.MYSQL;
var Allegro = require('./libs/allegro');

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
        Allegro.getProducts(key, pageNumber).then(function (response) {
                let countItems = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].metadata.Pageable.totalCount;
                let pageSize = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].metadata.Pageable.pageSize;
                const numOfPages = Math.ceil(countItems / pageSize);

                //TODO: wykozystac info o ilosci stron

                if(response.status != 200) {
                    pageNumber = 1000;
                    return;
                }

                let allItems = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].data.items;
                let sponsoredItems = allItems.sponsored;
                let promotedItems = allItems.promoted;

                _.each(promotedItems, function (item) {
                    //TODO: sprawdzenie tytulu pod katem slow kluczowych?

                    if (item.seller.company) {
                        let sellerID = item.seller.id;

                        Allegro.getSellerInfo(sellerID)
                            .then(response => {
                                let html = response.data;
                                let regexp = /<p>NIP:\s*([0-9\-]*)\s*<\/p>/i;

                                let find = html.match(regexp);

                                if (find !== undefined) {
                                    let nip = find[1].split('-').join('');

                                    axios
                                        .get('https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]=' + nip)
                                        .then((response) => {
                                            if (response.data.Dataobject.length) {
                                                let krs_podmioty = response.data.Dataobject[0].data;
console.log(nip);
                                                //TODO: sprawdzic czy wszystkie pola ktore chce pobrac sa
                                                //TODO: zgrac do bazy danych, jesli juz nie istenije ziomeczek o tym NIP
                                            }
                                        })
                                        .catch((err) => {
                                            console.log('Error in get data from KRS');
                                            //console.log(err);
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