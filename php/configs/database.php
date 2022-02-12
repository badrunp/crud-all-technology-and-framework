<?php 

$host = "localhost";
$user = "root";
$password = "";
$db_name = "crudphp";

$conn = mysqli_connect($host, $user, $password, $db_name);

if(!$conn){
    die("Kesalahan dalam koneksi Database " . mysqli_connect_error($conn));
}


?>