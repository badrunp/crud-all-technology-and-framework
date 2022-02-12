
<?php 

require "function.php";


if(isset($_POST['submit'])){
    if(createData($_POST) > 0){
        header('location: tampil-crud.php');
    }
}

?>

<?php include('teamplates/config.php'); ?>
<?php include('teamplates/header.php'); ?>
<?php include('teamplates/navbar.php') ?>

<div class="container mx-auto">
    <div class="max-w-xs mx-auto sm:max-w-sm md:max-w-none md:w-6/12 lg:w-5/12 py-8">
        <div class="bg-white shadow pt-4 pb-8">
            <div class="flex items-center px-4 md:px-6 py-4">
                <div class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:w-7 md:h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span class="text-1xl uppercase text-gray-600 md:text-3xl font-medium">Tambah (crud)</span>
                </div>
            </div>

            <div class="mt-4 px-4 md:px-6">
                <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="POST">
                    <div class="relative mb-4">
                        <input type="text" class="w-full focus:outline-none border py-3 px-3 border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-green-300 focus:border-transparent transition ease-out duration-150 text-sm <?= $errors['Nama'] ? 'border-red-500' : '' ?>" value="<?= $values['Nama'] ? $values['Nama'] : '' ?>" id="nama" placeholder="Nama" name="nama">
                        <?php if($errors['Nama']) { ?>
                            <span class="text-sm text-red-500 font-normal"><?= $errors['Nama']; ?></span>
                        <?php } ?>
                    </div>
                    <div class="relative mb-4">
                        <input type="text" class="w-full focus:outline-none border py-3 px-3 border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-green-300 focus:border-transparent transition ease-out duration-150 text-sm <?= $errors['Slug'] ? 'border-red-500' : '' ?>" value="<?= $values['Slug'] ? $values['Slug'] : '' ?>" id="slug" placeholder="Slug" name="slug" readonly>
                        <?php if($errors['Slug']) { ?>
                            <span class="text-sm text-red-500 font-normal"><?= $errors['Slug']; ?></span>
                        <?php } ?>
                    </div>
                    <div class="relative mb-4">
                        <select name="kategori" class="w-full py-3 px-3 border border-gray-300 text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent transition ease-out rounded <?= $errors['Kategori'] ? 'border-red-500' : '' ?>">
                            <?php if($values['Kategori']) { ?>
                                <option value="<?= $values['Kategori']; ?>" selected><?= $values['Kategori']; ?></option>
                            <?php } ?>

                            
                            <?= $values['Kategori']; ?>
                            <option value="">Pilih Kategori</option>
                            <option value="Elektronik">Elektronik</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Makanan">Makana</option>
                            <option value="Minuman">Minuman</option>
                            <option value="Minuman">Sport</option>
                        </select>
                        <?php if($errors['Kategori']) { ?>
                            <span class="text-sm text-red-500 font-normal"><?= $errors['Kategori']; ?></span>
                        <?php } ?>
                    </div>
                    <div class="relative mb-4">
                        <input type="text" class="w-full focus:outline-none border py-3 px-3 border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-green-300 focus:border-transparent transition ease-out duration-150 text-sm <?= $errors['Harga'] ? 'border-red-500' : '' ?>" value="<?= $values['Harga'] ? $values['Harga'] : '' ?>" placeholder="Harga" name="harga">
                        <?php if($errors['Harga']) { ?>
                            <span class="text-sm text-red-500 font-normal"><?= $errors['Harga']; ?></span>
                        <?php } ?>
                    </div>
                    <div class="relative mb-4">
                        <input type="text" class="w-full focus:outline-none border py-3 px-3 border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-green-300 focus:border-transparent transition ease-out duration-150 text-sm <?= $errors['Stok'] ? 'border-red-500' : '' ?>" value="<?= $values['Stok'] ? $values['Stok'] : '' ?>" placeholder="Stok" name="stok">
                        <?php if($errors['Stok']) { ?>
                            <span class="text-sm text-red-500 font-normal"><?= $errors['Stok']; ?></span>
                        <?php } ?>
                    </div>
                    <div class="relative mb-4">
                        <textarea type="text" class="w-full focus:outline-none border py-3 px-3 border-gray-300 rounded text-gray-600 focus:ring-2 focus:ring-green-300 focus:border-transparent transition ease-out duration-150 text-sm <?= $errors['Deskripsi'] ? 'border-red-500' : '' ?>" placeholder="Deskripsi" name="deskripsi" rows="5"><?= $values['Deskripsi'] ? $values['Deskripsi'] : '' ?></textarea>
                        <?php if($errors['Deskripsi']) { ?>
                            <span class="text-sm text-red-500 font-normal"><?= $errors['Deskripsi']; ?></span>
                        <?php } ?>
                    </div>
                    <div class="relative flex space-x-2">
                        <button type="submit" name="submit" class="py-3 px-5 text-center bg-green-500 rounded flex items-center space-x-1 tracking-wide hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition ease-out">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:w-5 md:h-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <span class="block text-gray-100 font-medium text-sm">Tambah</span>
                        </button>
                        <a href="tampil-crud.php" class="py-3 px-5 text-center bg-yellow-500 rounded flex items-center space-x-1 tracking-wide hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition ease-out">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:w-5 md:h-5 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                            </svg>
                            <span class="block text-gray-100 font-medium text-sm">Kembali</span>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php include('teamplates/footer.php'); ?>
