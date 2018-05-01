const _ = require('underscore')
const fs = require('fs')
const Product = require('../models/Product')

let data = []

Product.findAll().then(products => {
    _.each(products, product => {
        let images = JSON.parse(product.images)

        _.each(images, image => {
            data.push({
                product_id: product.product_id,
                image_url: image.url
            })
        })
    })

    fs.writeFile('imagesForProducts.csv', dataToCSV(data), function (err, file) {
        if (err)
            throw err

        console.log('Saved!')
    })
})

function dataToCSV(data) {
    let result = 'product_id,image_url\r\n'

    _.each(data, element => {
        result += element.product_id + ',' + element.image_url + '\r\n'
    })

    return result
}

