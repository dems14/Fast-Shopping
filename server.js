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

//delete a product
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


//////////////////////Clients Operations//////////////////////////

//get all clients
app.get('/api/clients', (req, res) => {
    mysqlConnection.query("SELECT * FROM Client", (err, rows, fields)=>{
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err)
        }
    });
});

//get a client by id 
/*app.get('/api/clients/:id', (req, res) => {
    mysqlConnection.query("SELECT * FROM Client WHERE ClientID = ?",[req.params.id], (err, rows, fields)=>{
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err)
        }
    });
});*/

//get a client by email 
app.get('/api/clients/:email', (req, res) => {
    mysqlConnection.query("SELECT * FROM Client WHERE Email = ?",[req.params.email], (err, rows, fields)=>{
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err)
        }
    });
});

//delete a clients
app.delete('/api/clients/:id', (req, res) => {
    mysqlConnection.query("DELETE FROM Client WHERE ClientID = ?",[req.params.id], (err, rows, fields)=>{
        if(!err) {
            res.send('Deleted successfully');
        }
        else {
            console.log(err)
        }
    });
});

//insert a clients
app.post('/api/clients', (req, res) => {
    let client = req.body;
    let sql = "SET @ClientId = ?; SET @Name = ?; SET @UserName = ?; SET @Address = ?; SET @Email = ?; SET @Phone = ?;\
    CALL InsertOrUpdateClients(@ClientId, @Name, @UserName, @Address, @Email, @Phone);";
    mysqlConnection.query(sql,[client.ClientId, client.Name, client.UserName, client.Address, client.Email, client.Phone], (err, rows, fields)=>{
        if(!err) {
            rows.forEach(element => {
                if(element.constructor == Array) {
                    res.send('' + element[0].ClientId);
                }
            });
        }
        else {
            console.log(err)
        }
    });
});


//update a clients
app.put('/api/clients', (req, res) => {
    let client = req.body;
    let sql = "SET @ClientId = ?; SET @Name = ?; SET @UserName = ?; SET @Address = ?; SET @Email = ?; SET @Phone = ?;\
    CALL InsertOrUpdateClients(@ClientId, @Name, @UserName, @Address, @Email, @Phone);";
    mysqlConnection.query(sql,[client.ClientId, client.Name, client.UserName, client.Address, client.Email, client.Phone], (err, rows, fields)=>{
        if(!err) {
            rows.forEach(element => {
                if(element.constructor == Array) {
                    res.send('Updated successfully');
                }
            });
        }
        else {
            console.log(err)
        }
    });
});

//////////////////////Clients Operations//////////////////////////
//create order
app.post('/api/clients/orders', (req, res) => {
    let order = req.body;
    let sql = "SET @_id = ?; SET @ClientId = ?; SET @total = ?; SET @cartItems = ?; \
    CALL InsertOrUpdateOrders(@_id, @ClientId, @total, @cartItems, curdate(), curdate());";
    mysqlConnection.query(sql,[order._id, order.ClientId, order.total, order.cartItems], (err, rows, fields)=>{
        if(!err) {
            rows.forEach(element => {
                if(element.constructor == Array) {
                    res.send(element[0]);
                }
            });
        }
        else {
            console.log(err)
        }
    });
});

//get all orders
app.get('/api/orders', (req, res) => {
    mysqlConnection.query("SELECT * FROM Orders", (err, rows, fields)=>{
        if(!err) {
            res.send(rows);
        }
        else {
            console.log(err)
        }
    });
});

const port = process.env.port || 5000;

app.listen(port, () => console.log("express server is running @ port 5000"));