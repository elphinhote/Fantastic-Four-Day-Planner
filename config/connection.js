// Const for MySQL!
const mysql = require("mysql");

//JawsDB for Heroku
var connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    // Connect to the Database!
    connection = mysql.createConnection({
        host: 'localhost',
        // My port
        port: 3306,
        // my username
        user: 'root',
        // my super secret password
        password: 'password',
        // Use the burgers_db database
        database: 'stocks_db',
    });
}

// Make the connection for heroku.
connection.connect();


// Always gotta module.export
module.exports = connection;