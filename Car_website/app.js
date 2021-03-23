const mysql=require('mysql');
const express=require('express');
const bodyparser=require('bodyparser');
const config=require('./config').connection;
var app=express();
app.use(bodyparser.json);
//port environment variable
const port=process.env.PORT ||8080;
app.listen(port,()=>console.log('Listening on port ${port}..'));

app.get('/register',(req,res)=>{
    connection.query("INSERT INTO `customer`(`Name`, `Email`, `Passwords`, `Driverlicence`, `Phonenumber`) VALUES (?,?,?,?,?)")
    });