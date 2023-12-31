var express = require("express")
var app = express()
var db = require("./database.js")
var cron = require('node-cron');
var bodyParser = require("body-parser");
const { request, response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let HTTP_PORT = 8000
const cors = require('cors');
app.use(cors({
    origin: '*'
}));



// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.post("/api/customer/register", (req, res, next) => {

    try {
        var errors = []

        if (!req.body) {
            errors.push("An invalid input");
        }

        const {
            name,
            address,
            email,
            dataOfBirth,
            gender,
            age,
            cardHolderName,
            cardNumber,
            expirtyDate,
            cvv,
            timeStamp
        } = req.body;

        const emailRegEx = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;;
        const creditCardRegEx = /^\d{12}$/;

        //validate email address
        if (emailRegEx.test(email) != true) {
            res.status(400).send("Invalid Email address");
            return;
        }

        //validate credit card number for 12 numbers only
        if (creditCardRegEx.test(cardNumber) != true) {
            res.status(400).send("Invalid credit card number");
            return;
        }

        var sql = 'INSERT INTO customer (name, address,email,dataOfBirth ,gender, age,cardHolderName,cardNumber,expirtyDate ,cvv ,timeStamp) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        var params = [name, address, email, dataOfBirth, gender, age, cardHolderName, cardNumber, expirtyDate, cvv, timeStamp]
        db.run(sql, params, function (err, result) {

            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.status(201).json({
                    "message": "customer " + name + " has registered",
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