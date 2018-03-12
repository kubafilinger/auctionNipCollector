var mysql = require('mysql');
var config = require('../config.js');
var MYSQL = config.MYSQL;

class Product {
    constructor() {
        this._id = null;
        this._productId = null;
        this._sellerId = null;
        this._images = null;
        this._url = null;
        this._name = null;
    }

    /**
     * @param mysqlConnection
     * @returns {*}
     */
    save(mysqlConnection) {
        if(this._id)
            return this._update(mysqlConnection);
        else
            return this._create(mysqlConnection);
    }

    _update(mysqlConnection) {
        //todo: sparsowac wszyskie dane i zapisac do bazy danych
    }

    /**
     * @param mysqlConnection
     * @returns {Promise<any>}
     * @private
     */
    _create(mysqlConnection) {
        let sql = "INSERT INTO product (" +
                "product_id, seller_id, images, url, name" +
            ") VALUES (" +
                "'" + this._productId + "'," +
                "'" + this._sellerId + "'," +
                "'" + this._images + "'," +
                "'" + this._url + "'," +
                "'" + this._name + "'" +
            ")"
        ;

        return new Promise((resolve, reject) => {
            mysqlConnection.query(sql, function (err, result) {
                if (err) reject(err);

                resolve(result);
            });
        });
    }

    get id() {
        return this._id;
    }

    get productId() {
        return this._productId;
    }

    set productId(value) {
        this._productId = value;
    }

    get sellerId() {
        return this._sellerId;
    }

    set sellerId(value) {
        this._sellerId = value;
    }

    get images() {
        return this._images;
    }

    set images(value) {
        this._images = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}

module.exports = Product;