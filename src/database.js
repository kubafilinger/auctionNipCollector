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

    let sql = "CREATE TABLE IF NOT EXISTS `frauder` (" +
            "id INT NOT NULL AUTO_INCREMENT," +
            "name VARCHAR(255)," +
            "nip VARCHAR(255)," +
            "PRIMARY KEY (`id`)" +
        ");"
    ;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});