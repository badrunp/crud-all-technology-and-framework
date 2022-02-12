<?php 
session_start();

require "function.php";

if(isset($_POST['delete'])){
    if(isset($_POST['id'])){
        if(deleteData($_POST['id']) > 0){
            header('location: tampil-crud.php');
        }
    }else{
        header('location: tampil-crud.php');
    }
    
}


?>