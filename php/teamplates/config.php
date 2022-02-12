<?php 

switch($_SERVER['SCRIPT_NAME']){
    case "/crudphp/kontak.php":
        $page_title = "Kontak Page";
        $current_page = "kontak";
        break;
    case "/crudphp/tambah-crud.php":
        $page_title = "Crud Page (Tambah)";
        $current_page = "crud";
        break;
    case "/crudphp/ubah-crud.php":
        $page_title = "Crud Page (Ubah)";
        $current_page = "crud";
        break;
    case "/crudphp/tampil-crud.php":
        $page_title = "Crud Page";
        $current_page = "crud";
        break;
    default:
        $page_title = "Home Page";
        $current_page = "index";
        break;
}

?>