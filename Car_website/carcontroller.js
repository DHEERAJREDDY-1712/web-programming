var mysql= require('mysql');
var bodyParser=require('body-parser');
const { request } = require('http');
const { response } = require('express');
const e = require('express');
var multer=require('multer'); //file upload operations
var alert = require('alert'); //
var urlencodedParser=bodyParser.urlencoded({extended: false});
var con= mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database: "rentacar"
}); //connection to the mysql database

var userdata="";

var Storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,"public/images/");
    },
    filename:function(req,file,callback){
        callback(null,file.originalname);
    }
});

var upload=multer({
storage:Storage
}).single("imguploader");

module.exports= function(app) {
    app.get('/home',function(req,res){
        if(req.session.loggedin==true){
        //req.session.username=req.body.username;
        //res.redirect("home");
        res.render("Home",{udata:userdata,usertype:req.session.usertype});
        }else{
            res.redirect(301,"login");
            console.log("Not Loggedin!!!");
        }
    });

    app.get('/aboutus',function(req,res){
        res.render('aboutus',{udata:userdata,usertype:req.session.usertype});
    });

    app.get('/register',function(req,res){
        res.render('registration',{udata:userdata,usertype:req.session.usertype});
    });
    // app.get('/profile',function(req,res){
    //    if(req.session.usertype=='customer'){
    //     res.render('profile',{udata:userdata,usertype : req.session.usertype});
    //    }else{
    //     res.end("<html><head><script>alert('This option is Only available to Customer')</script><head><body><a href='home'>Go Back</a></body></html>"); 
    //    }
    // });

    app.get('/login',function(req,res){
        if(req.session.loggedin){
            //res.end('<html><head><script>alert("You\'re already loggedin!");</script></head><body><a href="logout">Logout</body><html>');
        //res.render("home",{udata:userdata});
           // popup.alert({content:"you're already loggedin"});   
        }else{           
        res.render('login',{udata:userdata,usertype:req.session.usertype});
        }
    });

    app.post('/logincheck',function(req,res){
    var userType=req.body.usertype;
    var userName=req.body.name;
    var userPassword=req.body.password;
    var userEmail=req.body.email;
    var query=null;
    if(userType=='employee'){
    query="select * from employee where name='"+userName+"' and email='"+userEmail+" ' and password='"+userPassword+"'";
    }else{
        query="select * from customer where name='"+userName+"' and email='"+userEmail+" ' and password='"+userPassword+"'";
    }
    con.query(query,function(err,result,fields){
        if(result.length>0){
            req.session.loggedin=true;
            req.session.username=userName;
            req.session.usertype=userType;
            req.session.useremail=userEmail;
            userdata=JSON.parse(JSON.stringify(result));
            console.log('User data:'+userdata);
            res.redirect(301,"home");
        }else{
            res.end("<html><head><script>alert('Invalid login Credentials!')</script><head><body><a href='home'>Go Back</a></body></html>"); 
        }
    })
    });

        app.post('/registerme',urlencodedParser,function(req,res){
       
        console.log('User registeration request');
        if(req.body.name!=null && req.body.email!=null && req.body.password!=null && req.body.license!=null && req.body.phone!=null){
        var name=req.body.name;
        var email=req.body.email;
        var password=req.body.password;
        var license=req.body.license;
        var phone=req.body.phone;
        console.log("registering!!");
        query=  "insert into `customer`( `name`, `email`, `password`, `driverlicense`, `phonenumber`) values ('"+name+"','"+email+"','"+password+"','"+license+"','"+phone+"');";
        con.query(query,function(err,result,fields){
                if(err){
                    window.alert("Error in Registeration");
                console.log("Error in registeration");
                throw err;
                }else{
                    console.log("registered!!");
                    res.redirect(301,"login");
                }
                });
       }
        
    });

    app.get('/logoutme',function(req,res){
        console.log("Logged out!");
        req.session.loggedin=null;
        req.session.username=null;
        req.session.usertype=null;
        req.session.useremail=null;
        userdata=null;  
        console.log('logged out!');
        req.session.destroy(function(err){
                if(err){
                    console.log(err);
                }else{
                 console.log("Logged out");   
                }
        });
        res.render("login",{udata:userdata,usertype:""});
    });

    app.get('/cars',function(req,res){
        if(req.session.loggedin){
            res.render('cars',{usertype:req.session.usertype,udata:userdata});
        }else{
            res.end("<html><head><script>alert('please Login to view this page!')</script><head><body><a href='home'>Go Back!</a></body></html>"); 
        }
        
    });

    app.get('/addcar',function(req,res){
        res.render("addcar",{udata:userdata});
    })

    app.get("/bookcar",function(req,res){
        var carid=req.query.carid;
        console.log("card id"+carid);
        var data="";
        if(req.session.loggedin){
            var query="SELECT * FROM `car` WHERE `carid`='"+carid+"';";
            con.query(query,function(err,result,fields){
                if(!err){
                    data=JSON.parse(JSON.stringify(result));
                    console.log(data);
                    res.render("bookcar",{ uname : req.session.username, car:data, alert:"empty"}); 
                }else{
                    throw err;
                }
            });
            
        }else{
            console.log("not logged in"+data);
            res.render("bookcar",{ uname : req.session.username, car:data, alert:"empty"});
        }
    });


    app.get("/removecar",function(req,res){
        var carid=req.query.carid;
        console.log("car id:"+carid);
        if(req.session.loggedin){
            var query="DELETE FROM `car` WHERE `carid`='"+carid+"';";
            con.query(query,function(err,result,fields){
                if(!err){
                    res.end("<html><head><script>alert('Car removed Successfully!')</script><head><body><a href='home'>Go Back!</a></body></html>"); 
                }else{
                    throw err;
                }
            });
        }
    });

    app.post('/addbooking',function(req,res){
        var carid=req.body.carid;
        var pickupdate=req.body.pdate;
        var pickuptime=req.body.ptime;
        var deliverydate=req.body.ddate;
        var deliverytime=req.body.dtime;
        var username=req.session.username;
        if(req.session.loggedin){
           var query="insert into booking(cid,pdate,ptime,ddate,dtime,username) values('"+carid+"','"+pickupdate+"','"+pickuptime+"','"+deliverydate+"','"+deliverytime+"','"+username+"')"; 
            con.query(query,function(err,result,fields){
                if(err){
                    return res.end("something went wrong!");
                }else{
                  //  res.alert("car booked successfully!!!");
                  res.end("<html><head><script>alert('Registered Successfully!')</script><head><body><a href='home'>Go Back!</a></body></html>");  
                 //res.end("Car booked successfully!! ");
                }             
            });            
        }
    });

    app.post("/uploadcar",function(req,res){
        var carimage=null;  
        upload(req,res,function(err){
                console.log(err);
               if(err){
                   throw err;
                   //return res.end("<script>alert('something went wrong!');</script>");
               }else{
                console.log(req.file.originalname);
                carimage='images/'+req.file.originalname;

                //    req.files.forEach(function(value,key) {
                //        console.log(value.originalname);
                //        carimage='images/'+value.originalname;
                //    });
                //var carimage='images/'+req.files[0].filename;   
                var cartype=req.body.cartype;
                var carmodel=req.body.carmodel;
                var carbrand=req.body.carbrand;
                var caryear=req.body.caryear+'';
                var hourlyprice=req.body.hourlyprice+'';
                
                console.log(carimage+cartype+carmodel+carbrand+caryear+hourlyprice);
                if(req.session.loggedin){
                   var query="INSERT INTO `car`(`carimage`, `brand`, `model`, `type`, `year`, `hourlyprice`) values('"+carimage+"','"+carbrand+"','"+carmodel+"','"+cartype+"','"+caryear+"','"+hourlyprice+"')"; 
                    con.query(query,function(err,result,fields){
                        console.log('result'+result);
                        if(err){
                            console.log(err);
                            return res.end("<script>alert('something went wrong!');</script>");
                        }else{
                          //  res.alert("car booked successfully!!!");
                          return res.end("<html><head><script>alert('Car Added Successfully!')</script><head><body><a href='home'>Go Back!</a></body></html>");  
                         //res.end("Car booked successfully!! ");
                        }             
                    });            
                }       
               }
            });
    });

    app.get('/viewbookings',function(req,res){
        data="";
        var query="SELECT * FROM `booking` join car ON booking.cid=car.carid where username='"+req.session.username+"';";
        if(req.session.loggedin){
            con.query(query,function(err,result,fields){
                if(err)
                throw err;
                data=JSON.parse(JSON.stringify(result)); 
                console.log("Data is "+data);
                res.render('viewbookings',{todos:data});
            })
        }else{
           // res.send('content-type','application/json');
           res.end("<html><head><script>alert('please Login to view this page!')</script><head><body><a href='home'>Go Back!</a></body></html>"); 
        }
        //res.render('viewbookings',{})
    });

    app.get('/economy',function(req,res){
        data="";
        var query="select * from car where type='Economy';";
        if(req.session.loggedin){
            con.query(query,function(err,result,fields){
                if(err)
                throw err;
                data=JSON.parse(JSON.stringify(result));
                console.log("Data is "+data);
                res.render('economy',{economies:data,usertype:req.session.usertype});
            })
        }else{
           // response.send('content-type','application/json');
           res.end("<html><head><script>alert('please Login to view this page!')</script><head><body><a href='home'>Go Back!</a></body></html>"); 
        }
       // res.render('luxury',{});
    });

    app.get('/luxury',function(req,res){
        data="";
        var query="select * from car where type='Luxury';";
        if(req.session.loggedin){
            con.query(query,function(err,result,fields){
                if(err)
                throw err;
                data=JSON.parse(JSON.stringify(result));
                console.log("Data is "+data);
                res.render('luxury',{luxuries:data,usertype:req.session.usertype});
            })
        }else{
           // response.send('content-type','application/json');
           res.end("<html><head><script>alert('please Login to view this page!')</script><head><body><a href='home'>Go Back!</a></body></html>"); 
        }
       // res.render('luxury',{});
    });

    app.get('/suv',function(req,res){
        data="";
        var query="select * from car where type='SUV';";
        if(req.session.loggedin){
            con.query(query,function(err,result,fields){
                if(err)
                throw err;
                data=JSON.parse(JSON.stringify(result));
                console.log("Data is "+data);
                res.render('suv',{suvs:data,usertype:req.session.usertype});
            })
        }else{
           // response.send('content-type','application/json');
            res.end("<html><head><script>alert('please Login to view this page!')</script><head><body><a href='home'>Go Back!</a></body></html>"); 
        }
        //res.render('suv',{username:req.session.username,suvs:data});
    });


    


}