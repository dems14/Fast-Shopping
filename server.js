const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

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
    let sql = "SET @_id = ?; SET @Title = ?; SET @Description = ?; SET @Image = ?; SET @Price = ?; SET @Categories = ?;\
    CALL InsertOrUpdateProducts(@_id, @Title, @Description, @Image, @Price, @Categories);";
    mysqlConnection.query(sql,[product._id, product.Title, product.Description, product.Image, product.Price, product.Categories], (err, rows, fields)=>{
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