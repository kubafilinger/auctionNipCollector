const config = require('./config')
const axios = require('axios')
const Seller = require('./models/Seller')
const ReverseIp = require('./models/ReverseIp')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const _ = require('underscore')

Seller.findAll({
    where: {
        www: {
            [Op.ne]: null
         }
    }
}).then(sellers => {
    _.each(sellers, (seller) => {
        let domain = (seller.www !== undefined) ? seller.www : ''

        if(domain != '') {
            axios.get(config.getDomainIpEndpoint + domain)
                .then(function (response) {
                    let ip = response.data.query
                    let url = config.REVERSE_IP.endpoint + 'apiKey=' + config.REVERSE_IP.apiKey + '&ip=' + ip

                    axios.get(url)
                        .then(function(response) {
                            let domains = response.data.result

                            if(domains != "No data found.") {
                                _.each(domains, (domain) => {
                                    ReverseIp.create({
                                        seller: seller.id,
                                        server_ip: ip,
                                        domain: domain.name
                                    })
                                })
                            }
                        }).catch(function (error) {
                        console.log(error)
                    })
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    })
})