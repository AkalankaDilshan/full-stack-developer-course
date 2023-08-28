// Import necessary modules
var express = require("express");
var app = express();
var db = require("./database.js");
var bodyParser = require("body-parser");
const { request, response } = require("express");

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the HTTP port for the server
let HTTP_PORT = 8000;

// Enable CORS
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

// API endpoint to register a customer
app.post("/api/customer/register", (req, res, next) => {
    try {
        var errors = []

        // Check for missing fields
        const requiredFields = [
            "name",
            "address",
            "email",
            "dateOfBirth",
            "gender",
            "age",
            "cardHolderName",
            "cardNumber",
            "expiryDate",
            "cvv",
            "timestamp"
        ];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                errors.push(`${field} is required.`);
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors: errors });
        }

        const {
            name,
            address,
            email,
            dateOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expiryDate,
            cvv,
            timestamp
        } = req.body;

        // Regular expressions for email and credit card validation
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const creditCardRegEx = /^\d{12}$/;

        // Validate email address
        if (emailRegEx.test(email) != true) {
            res.status(400).send("Invalid Email address");
            return;
        }

        // Validate credit card number for 12 numbers only
        if (creditCardRegEx.test(cardNumber) != true) {
            res.status(400).send("Invalid credit card number");
            return;
        }

        // SQL query to insert customer data into the database
        var sql = 'INSERT INTO customer (name, address,email,dateOfBirth ,gender, age,cardHolderName,cardNumber,expiryDate,cvv ,timestamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = [name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timestamp]
        
        // Execute the query
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                // Return the success response
                res.status(201).json({
                    "message": "Customer " + name + " has registered",
                    "customerId": this.lastID
                })
            }
        });
    } catch (E) {
        res.status(400).send(E);
    }
});

// Root path
app.get("/", (req, res, next) => {
    res.json({ "message": "University of Moratuwa" })
});
