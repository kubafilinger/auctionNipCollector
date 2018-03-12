var axios = require('axios');

module.exports = {
    getProducts: function(keyword = '', page = 1) {
        return axios
            .get('https://allegro.pl/kategoria/telefony-i-akcesoria?offerTypeBuyNow=1&vat_invoice=1&string=' + keyword + '&p=' + page, {
                headers: {'Accept': 'application/vnd.opbox-web.v2+json'}
            })
    },
    getSellerInfo: function (sellerID = 0) {
        return axios
            .get('http://allegro.pl/company_icon_get_data_ajax.php?user=' + sellerID)
    }
}