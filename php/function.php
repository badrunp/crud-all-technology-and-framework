<?php 

session_start();

require "configs/database.php";
$errors = [];
$values = [];

function query($queryOrData, $get, $type){
    global $conn;
    if($type ===  "ambilData"){
        $result = mysqli_query($conn, $queryOrData) or die("Database error " . mysqli_error($conn));
    }else if($type === "cariData"){
        $batas = 5;
        $page = (isset($get['page'])) ? (int)$get['page'] : 1;
        $mulai = ($page - 1) * $batas;
        $cari = $queryOrData['cari'];
        $cari = preg_replace("#[^0-9a-z]i#","", $cari);
        $result = mysqli_query($conn, "SELECT * FROM produk WHERE nama LIKE '%$cari%' LIMIT $mulai, $batas");
    }
    $rows = [];
    while($row = mysqli_fetch_assoc($result)){
        $rows[] = $row;
    } 
    return $rows;
}

function createData($data){
    global $conn;
    global $errors;

    $nama = checkInput($data['nama'], 'Nama');
    $slug = checkInput($data['slug'], 'Slug');
    $kategori = checkInput($data['kategori'], 'Kategori');
    $harga = checkInput($data['harga'], 'Harga');
    $stok = checkInput($data['stok'], 'Stok');
    $deskripsi = checkInput($data['deskripsi'], 'Deskripsi');
    if(count($errors) === 0){
        $query = "INSERT INTO produk (nama, slug, kategori, harga, stok, deskripsi) VALUES (
            '$nama', '$slug', '$kategori', '$harga', '$stok', '$deskripsi'
        )";

        mysqli_query($conn, $query) or die("database error " . mysqli_error($conn));
        $_SESSION["message"] = "Data berhasil ditambahkan";

        return mysqli_affected_rows($conn);
    }

    return -1;
}

function updateData($data){
    global $conn;
    global $errors;

    $id = $data['id'];
    $nama = checkInput($data['nama'], 'Nama');
    $slug = checkInput($data['slug'], 'Slug');
    $kategori = checkInput($data['kategori'], 'Kategori');
    $harga = checkInput($data['harga'], 'Harga');
    $stok = checkInput($data['stok'], 'Stok');
    $deskripsi = checkInput($data['deskripsi'], 'Deskripsi');

    if(count($errors) === 0){
        
        $query = "UPDATE produk SET nama='$nama',slug='$slug',kategori='$kategori',harga=$harga,stok=$stok,deskripsi='$deskripsi' WHERE id=$id";

        mysqli_query($conn, $query) or die("database error " . mysqli_error($conn));
        $_SESSION["message"] = "Data berhasil diubah";
        
        return mysqli_affected_rows($conn);
    }
    
    return -1;
}

function deleteData($id){
    global $conn;
    
    $query = mysqli_query($conn, "DELETE FROM produk WHERE id = $id") or die("Database error " . mysqli_error($conn));
    $_SESSION["message"] = "Data berhasil dihapus";

    return mysqli_affected_rows($conn);
}


function checkInput($input, $key){
    global $errors;
    global $values;
    if(empty($input)){
        $errors[$key] = $key . " tidak boleh kosong!";
        return;
    }else{
        $values[$key] = $input;
        unset($errors[$key]);
        return clearInput($input);
    }
}

function clearInput($input){
    $data = trim($input);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function updateStatus($data){
    global $conn;
    $status = $data['status'];
    $slug = $data['slug'];

    $query = "UPDATE produk SET stok_status=$status WHERE slug='$slug'";
    mysqli_query($conn, $query);
    return mysqli_affected_rows($conn);
}


?>