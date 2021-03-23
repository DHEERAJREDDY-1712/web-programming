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
// connection.connect((err)=>{
//     if(!err){
//         // console.log("connected");
//     }else{
//         // console.log("connection error!");
//     }
// });

module.exports=connection;