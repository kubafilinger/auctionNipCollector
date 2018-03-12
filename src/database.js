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

    let sql = "CREATE TABLE IF NOT EXISTS `seller` (" +
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
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});