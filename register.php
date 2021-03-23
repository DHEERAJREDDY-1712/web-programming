<?php
require('connection.php');
$name=$_POST['name'];
$email=$_POST['email'];
$password=$_POST['password'];
$driverlicense=$_POST['license'];
$phonenumber=$_POST['phone'];

//$query ="insert into customer (Name,Email,Passwords,Driverlicence,Phonenumber) values($name,$email,$password,$driverlicense,$phonenumber);";
$query ="INSERT INTO `customer`(`Name`, `Email`, `Passwords`, `Driverlicence`, `Phonenumber`) VALUES ('$name','$email','$password','$driverlicense','$phonenumber');";
$result=mysqli_query($conn,$query);
if($result){
	echo "{'message':'Registered Successfully !','status':'true'}";
}else{
	echo "{'message':'Something went wrong !','status':'false'}";
}
mysqli_close($conn);

?>