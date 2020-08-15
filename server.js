const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

/*********Connection Settings************/

let mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Kirin696',
    database:'FastMarketDB',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err) {
        console.log('DB connection succeded');
    }
    else{
        console.log('DB connection failed \n', JSON.stringify(err, undefined, 2));
    }
});


//////////////////////Product Operations//////////////////////////

//get all products
app.get('/api/products', (req, res) => {
    mysqlConnection.query("SELECT * FROM Products", (err, rows, fields)=>{
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err)
        }
    });
});

//insert a product
app.post('/api/products', (req, res) => {
    let product = req.body;
    let sql = "SET @_id = ?; SET @title = ?; SET @description = ?; SET @image = ?; SET @price = ?; SET @categories = ?;\
    CALL InsertOrUpdateProducts(@_id, @title, @description, @image, @price, @categories);";
    mysqlConnection.query(sql,[product._id, product.title, product.description, product.image, product.price, product.categories], (err, rows, fields)=>{
        if(!err) {
            rows.forEach(element => {
                if(element.constructor == Array) {
                    res.send('inserted product id : ' + element[0]._id);
                }
            });
        }
        else {
            console.log(err)
        }
    });
});

//delete a clients
app.delete('/api/products/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM Products WHERE _id = ?",[req.params.id], (err, rows, fields)=>{
        if(!err) {
            res.send('Deleted successfully');
        }
        else {
            console.log(err)
        }
    });
});

const port = process.env.port || 5000;

app.listen(port, () => console.log("express server is running @ port 5000"));