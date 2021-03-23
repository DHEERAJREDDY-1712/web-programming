const express=require('express');
const bodyparser=require('body-parser');
const router=require('express').Router();
//const connection=require('./config').connection;
const app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}))
//port environment variable
//setup server port
const port=process.env.PORT|| 8080;
app.listen(port,()=>console.log('Listening on port localhost:',port));
app.get("/",(req,res)=>{
res.send("hello world!!");
});

router.use(function(req,res,next){
console.log('---new request ---');
next();
});
const mysql = require('mysql');
const connection=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'rentacar',
    connectionLimit: 10,
    multipleStatements:true
});

connection.getConnection(function(err,conn){
    if(err)
    console.log("connection error!");
    else
    console.log("connected");
   // return response.send(400);
});

// router.route('/login').get(function(req,res){
//     res.redirect('http://google.com');
// })
var records=['abc','abc@gmail.com','abc123','abcabcabc','5145755625'];
// app.get('/login',(req,res)=>{
//     res.redirect('/site');
// });

app.get('/register',(req,res)=>{
    connection.query("INSERT INTO `customer`(`Name`, `Email`, `Passwords`, `Driverlicence`, `Phonenumber`) VALUES (?,?,?,?,?);",
    [req.query.name,req.query.email,req.query.password,req.query.license,req.query.phone],(err,result,fields)=>{
        console.log(result);
        res.send({"message":"Registered successfully !!!","status":"true"});
        //res.sendFile(__dirname+'/site/login.html');
    });
});
app.get('/login',(req,res)=>{
   connection.query("SELECT * from customer where Email='?' and Passwords='?';",
    [req.query.email,req.query.password],function(err,results,fields){
        if(results){
            console.log(req.query.email," logged in !!!");
            res.send({"message":"logged in successfully !!!","status":"true"});
            res.end();
            //res.sendFile(__dirname+'/site/home.html');
        }
       // console.log(result[0].toString());
        //res.redirect('http://google.com');
        
    });
});

