const bodyParser = require('body-parser');
var express = require('express');
var app=express();
var session=require('express-session');
const carcontroller = require('./controller/carcontroller');

app.get('/',function(req,res){ //entry point of website
res.render('login',{udata:""});
});

//to setup a template engine
app.set('view engine','ejs');

app.use(session({
    secret : 'nothing',
    resave : true,
    saveUninitialized: true
}));
//to access all static files
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//controller to control routing
carcontroller(app);
//to listen all request on specific port
app.listen(3000,function(){
console.log('Car Website is listening on port: 3000');
});

// Phase 3 : (10th April)
// Tasks:
// Employee:
//done 1.	Create employee login Radio button 
//done 2.	Create employee table in database (User ID and Password) 
//done 3.	Add new car 
// 4.	Edit car (Modify, Delete)
// 5.	Edit reservation.
//done 6.	Connect car and reservation with database 

// Customer:
// 1.	Create customer profile ( all details of sign up except password)
// 2.	Create reservation button on each car posting (Pick up and delivery date and time, estimated rent)
// 3.	Connect reservation with database.