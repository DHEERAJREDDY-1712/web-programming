<?php
require('connection.php');
$name=$_POST['fname'];
$email=$_POST['email'];
$password=$_POST['password'];

//$query ="insert into customer (Name,Email,Passwords,Driverlicence,Phonenumber) values($name,$email,$password,$driverlicense,$phonenumber);";
$query ="SELECT * from customer where Email='$email' and Passwords='$password'";
$result=mysqli_query($conn,$query);
if($result){
	echo "{'message':'Logged in Successfully !','status':'true'}";
}else{
	echo "{'message':'Something went wrong !','status':'false'}";
}
mysqli_close($conn);

?>