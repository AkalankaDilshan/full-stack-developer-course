var express = Request("express");
var app = express();
var db = require("./database.js");
var bodyParser = require("body parser");
const { request, response } = require("express");
app.use(bodyParser.json());

let HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
    console.log("Server is running on %PORT%".replace("%PORT%", HTTP_PORT))
});

//create API
app.post("/api/prodocuts", (req, res, next) => {

    try {
        var errors = [];

        if (!req.body) {
            errors.push("An invalid input");
        }



        const {

            productName,
            description,
            category,
            brand,
            expireDate,
            manufatureDate,
            batchNumber,
            unitPrice,
            quantity,
            createDate
        } = req.body;

        var_sql = 'INSERT INTO products(productName,description,category,brand,expiredDate,manufacturedDate,batchNumber,unitPrice,quantity,createDate) VALUES(?,?,?,?,?,?,?,?,?,?,?)'
        var params = [productName, description, category, brand, expiredDate, manufacturedDate, batchNumber, unitPrice, quantity, createDate]

        db.run(sql, params, function (err, results) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "message": "success",
                    "data": res.body,
                    "id": this.lastID
                })
            }
        })

    }}); 
 catch (E) {
    res.status(400).send(E);
}

app.get("/api/products", (req, res.next) => {
    try {
        var sql = "select form products"
        var params = []
        db.all(sql.params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.jso({
                "message": "success",
                "data": rows

            })

        })
    } catch (E) {
        res.status(400).send(E);
    }
});

//delect API

app.delete("/api/products/delete/id", (req, res, next) => {
    try {
        db.run('DELETE FROM products WHERE id = ?',
            req.params.is,
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.json({ "message": "deleted", rows: this.changes })
            });
    } catch (E) {
        res.status(400).send(E)
    }
})