var mysql = require('mysql');
var MYSQL = require('./config.js').MYSQL;

let con = mysql.createConnection({
    host: MYSQL.host,
    user: MYSQL.user,
    password: MYSQL.password,
    database: MYSQL.database
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    let seller = "CREATE TABLE IF NOT EXISTS `seller` (" +
            "id INT NOT NULL AUTO_INCREMENT," +
            "address VARCHAR(255) NULL DEFAULT NULL," +
            "registration_date DATETIME NULL DEFAULT NULL," +
            "check_date DATETIME NULL DEFAULT NULL," +
            "email VARCHAR(255) NULL DEFAULT NULL," +
            "phone VARCHAR(255) NULL DEFAULT NULL," +
            "company VARCHAR(255) NULL DEFAULT NULL," +
            "krs VARCHAR(255) NULL DEFAULT NULL," +
            "regon VARCHAR(255) NULL DEFAULT NULL," +
            "www VARCHAR(255) NULL DEFAULT NULL," +
            "created_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP," +
            "updated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
            "mojepanstwo_url VARCHAR(255) NULL DEFAULT NULL," +
            "allegro_username VARCHAR(255) NULL DEFAULT NULL," +
            "nip VARCHAR(255) NULL DEFAULT NULL," +
            "PRIMARY KEY (`id`)" +
        ");"
    ;

    let product = "CREATE TABLE IF NOT EXISTS `product` (" +
            "id INT NOT NULL AUTO_INCREMENT," +
            "product_id INT NULL DEFAULT NULL," +
            "seller_id INT NULL DEFAULT NULL," +
            "images TEXT NULL DEFAULT NULL," +
            "url TEXT NULL DEFAULT NULL," +
            "name TEXT NULL DEFAULT NULL," +
            "PRIMARY KEY (`id`)" +
        ");"
    ;

    con.query(seller, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });

    con.query(product, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});