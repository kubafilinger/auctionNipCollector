// Collector
//TODO: pobrac zawartosc wyszukiwarki na allegro i dostac sie do zmiennej window.costam z JSONem
//TODO: wyszukac w jsonie numery ID sprzedawcow
//TODO: Po id sprzedawcy odwolac sie do kolejnego url ktorym pobieramy dane sprzedawcy
//TODO: Znalezć numer NIP i odpowiednio obrobic (do postaci samych liczb)
//TODO: Pobrac zawartosc KRS z odpowiedniego URL (z zawartym nip) i odnalesc link do info o nipie
//TODO: Po pobraniu storny pod tym linkiem, wyszukanie najwazniejszych info (daty i etc)
//TODO: Zapisanie wszystkoego do bazy danych

//Bazadanych
//TODO: zaprojektowac schemat tabeli bazy danych

var axios = require('axios');
var _ = require('underscore');

axios
    .get('https://allegro.pl/listing?string=iphone&p=2', {
        headers: { 'Accept': 'application/vnd.opbox-web.v2+json' }
    })
    .then(function (response) {
        let allItems = response.data.dataSources['listing-api-v3:allegro.listing:3.0'].data.items;
        let sponsoredItems = allItems.sponsored;
        let promotedItems = allItems.promoted;

        _.each(promotedItems, function (item) {
            //TODO: sprawdzenie tytulu pod katem slow kluczowych?

            if(item.seller.company) {
                let sellerID = item.seller.id;

                //TODO

                axios
                    .get('http://allegro.pl/company_icon_get_data_ajax.php?user=' + sellerID)
                    .then(response => {
                        console.log(response.data);

                        //TODO: wyłuskać NIP

                        response.data.getElementsByTagName('p');

                        _.each(p, function(elem) {
                            console.log(elem);
                        });
                    })
                ;
            }
        })
    })
    .catch(function (e) {

    });