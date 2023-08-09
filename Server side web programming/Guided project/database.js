var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE,(err)=>{
    if(err){
        console.error(err.message)
        throw.err
    }else{
        console.log('Connrcted to the SQLite Database')
        db.run(CREATE TABLE product (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productName text,
            description text,
            category text,
            brand text,
            expireDate text,
            manufatureDate text,
            batchNumber INTEGER,
            unitPrice INTEGER,
            quantity INTEGER,
            createDate text
        ), (err) =>{
            if(err){
                //table already created
            }else{
                //table just created, creating some rows
                var insert = 'INSERT INTO products(productName,description,category,brand,expiredDate,manufacturedDate,batchNumber,unitPrice,quantity,createDate) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
                db.run(insert,["white basmthi rice","import from pakistan","rice","Araliya","2023.10.27","CIC","44576","400","100","2023.08.08"]);
            }
        }


        )

    }

})
