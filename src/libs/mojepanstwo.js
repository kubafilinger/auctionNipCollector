var axios = require('axios');

module.exports = {
    getCompanyData: function (nip = '') {
        return axios
            .get('https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.nip]=' + nip)
    }
}