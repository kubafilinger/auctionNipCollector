var mysql = require('mysql');
var config = require('../config.js');
var MYSQL = config.MYSQL;

class Seller {
    constructor() {
        this._id = null;
        this._address = null;
        this._email = null;
        this._phone = null;
        this._company = null;
        this._krs = null;
        this._nip = null;
        this._regon = null;
        this._www = null;
        this._mojepanstwoUrl = null;
        this._allegroUsername = null;
        this._registrationDate = null;
        this._checkDate = null;
        this._createdAt = null;
        this._updatedAt = null;
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
        let sql = "INSERT INTO seller (" +
                "address, registration_date, check_date, email, phone, company, krs, regon, www, mojepanstwo_url, allegro_username, nip" +
            ") VALUES (" +
                "'" + this._address + "'," +
                "'" + this._registrationDate + "'," +
                "'" + this._checkDate + "'," +
                "'" + this._email + "'," +
                "'" + this._phone + "'," +
                "'" + this._company + "'," +
                "'" + this._krs + "'," +
                "'" + this._regon + "'," +
                "'" + this._www + "'," +
                "'" + this._mojepanstwoUrl + "'," +
                "'" + this._allegroUsername + "'," +
                "'" + this._nip + "'" +
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

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get phone() {
        return this._phone;
    }

    set phone(value) {
        this._phone = value;
    }

    get company() {
        return this._company;
    }

    set company(value) {
        this._company = value;
    }

    get krs() {
        return this._krs;
    }

    set krs(value) {
        this._krs = value;
    }

    get nip() {
        return this._nip;
    }

    set nip(value) {
        this._nip = value;
    }

    get regon() {
        return this._regon;
    }

    set regon(value) {
        this._regon = value;
    }

    get www() {
        return this._www;
    }

    set www(value) {
        this._www = value;
    }

    get mojepanstwoUrl() {
        return this._mojepanstwoUrl;
    }

    set mojepanstwoUrl(value) {
        this._mojepanstwoUrl = value;
    }

    get allegroUsername() {
        return this._allegroUsername;
    }

    set allegroUsername(value) {
        this._allegroUsername = value;
    }

    get registrationDate() {
        return this._registrationDate;
    }

    set registrationDate(value) {
        this._registrationDate = value;
    }

    get checkDate() {
        return this._checkDate;
    }

    set checkDate(value) {
        this._checkDate = value;
    }

    get createdAt() {
        return this._createdAt;
    }

    set createdAt(value) {
        this._createdAt = value;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    set updatedAt(value) {
        this._updatedAt = value;
    }
}

module.exports = Seller;