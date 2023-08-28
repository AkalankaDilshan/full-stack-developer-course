//var md5 = require('md5')
const sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

// Create a SQLite database connection
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        // Create the 'customer' table if it doesn't exist
        db.run(`CREATE TABLE IF NOT EXISTS customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            address TEXT,
            email TEXT,
            dateOfBirth TEXT,
            gender TEXT,
            age INTEGER,
            cardHolderName TEXT,
            cardNumber TEXT,
            expiryDate TEXT,
            cvv TEXT,
            timestamp TEXT
        )`);
    }
});

module.exports = db;



