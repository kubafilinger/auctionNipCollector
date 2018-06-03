const axios = require('axios')

let domain = process.argv[2]

axios.get('http://ip-api.com/json/' + domain)
    .then(function (response) {
        let ip = response.data.query
        let api_key = 'at_uFPsu6Ht12kCd1BFB4iGYeMqLK1tc'
        let api_url = 'https://reverse-ip-api.whoisxmlapi.com/api/v1?'
        let url = api_url + 'apiKey=' + api_key + '&ip=' + ip

        axios.get(url)
            .then(function(response) {
                let domains = response.data.result;

                console.log(domains.length)
            }).catch(function (error) {
                console.log(error)
            })
    })
    .catch(function (error) {
        console.log(error)
    })