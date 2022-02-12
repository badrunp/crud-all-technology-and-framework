<?php

session_start();

require "function.php";

session_destroy();
session_unset();

if (isset($_GET['slug']) && isset($_GET['status'])) {
    if (updateStatus($_GET) > 0) {
        header('location: tampil-crud.php');
    }
}

$batas = 5;
$page = (isset($_GET['page'])) ? (int)$_GET['page'] : 1;
$mulai = ($page - 1) * $batas;

$produk = query("SELECT * FROM produk LIMIT $mulai, $batas", $_GET, 'ambilData');
$produkJumlah = query("SELECT * FROM produk", $_GET, 'ambilData');
$jumlahData = count($produkJumlah);

if (isset($_POST["tombol_cari"])) {
    if ($_POST['cari'] !== "") {
        $produk = query($_POST, $_GET, 'cariData');
        $jumlahData = count($produk);
    }
}

$halaman = ceil($jumlahData / $batas);
$prev = $page - 1;
$next = $page + 1;

?>

<?php include('teamplates/config.php'); ?>
<?php include('teamplates/header.php'); ?>
<?php include('teamplates/navbar.php') ?>

<div class="container mx-auto">
    <div class="max-w-xs mx-auto sm:max-w-sm my-8 md:max-w-none md:w-11/12">
        <div class="bg-white shadow rounded py-4">
            <div class="py-4 px-4 md:px-6 flex items-center justify-between">
                <div class="flex space-x-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:w-7 md:h-7 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span class="text-2xl uppercase text-gray-600 md:text-4xl font-medium">Php Crud</span>
                </div>
                <div class="flex space-x-4 items-center">
                    <div class="hidden md:block">
                        <div class="relative">
                            <form action="<?= htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST" class="flex items-center relative">
                                <input type="text" name="cari" class="border border-gray-300 rounded focus:outline-none py-2 px-3 w-72 text-gray-600 pr-14 focus:ring-2 focus:ring-green-300 focus:border-transparent" placeholder="Cari...">
                                <button name="tombol_cari" class="py-2 px-3 bg-green-500 rounded absolute right-0 focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-green-600 transition duration-150 ease-out">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>

                    <a href="tambah-crud.php" class="py-2 px-4 bg-green-500 rounded cursor-pointer hover:bg-green-600 transition ease-out duration-150 focus:ring-4 focus:ring-green-300 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </a>
                </div>
            </div>

            <div class="block md:hidden px-4 md:px-6">
                <form action="<?= htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="POST" class="flex items-center relative">
                    <input type="text" name="cari" class="border border-gray-300 rounded focus:outline-none py-2 px-3 w-72 text-gray-600 pr-14 focus:ring-2 focus:ring-green-300 focus:border-transparent" placeholder="Cari...">
                    <button name="tombol_cari" class="py-2 px-3 bg-green-500 rounded absolute right-0 focus:outline-none focus:ring-4 focus:ring-green-300 hover:bg-green-600 transition duration-150 ease-out">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>
            </div>

            <div class="py-4 px-4 md:px-6">
                <div class="relative w-full overflow-x-auto">
                    <?php if ($_SESSION['message']) { ?>
                        <div class="w-full py-3 bg-green-200 bg-opacity-60 text-center mb-4 rounded shadow flex items-center space-x-1 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-greenr-700" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                            </svg>
                            <span class="blobk text-green-700 font-medium tracking-wide"><?= $_SESSION['message']; ?></span>
                        </div>
                    <?php } ?>
                    <table class="w-full text-center divide divide-y-2 divide-green-600  shadow-lg">
                        <thead>
                            <tr class="bg-green-200 bg-opacity-60">
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">No.</th>
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">Nama</th>
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">Slug</th>
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">Kategori</th>
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">Harga</th>
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">Stok</th>
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">Deskripsi</th>
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">Status</th>
                                <th class="text-sm font-bold text-green-700 py-3 px-4 tracking-wide">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php $i = 1;  ?>
                            <?php if (count($produk) > 0) { ?>
                                <?php foreach ($produk as $data) { ?>
                                    <tr class="border-b border-gray-200">
                                        <td class="text-sm py-3 px-4 text-gray-400 font-medium tracking-wide"><?= $i++; ?></td>
                                        <td class="text-sm py-3 px-4 text-gray-400 font-normal tracking-wide"><?= $data['nama']; ?></td>
                                        <td class="text-sm py-3 px-4 text-gray-400 font-normal tracking-wide"><?= $data['slug']; ?></td>
                                        <td class="text-sm py-3 px-4 text-gray-400 font-normal tracking-wide"><?= $data['kategori']; ?></td>
                                        <td class="text-sm py-3 px-4 text-gray-400 font-normal tracking-wide"><?= $data['harga']; ?></td>
                                        <td class="text-sm py-3 px-4 text-gray-400 font-normal tracking-wide"><?= $data['stok']; ?></td>
                                        <td class="text-sm py-3 px-4 text-gray-400 font-normal tracking-wide"><?= $data['deskripsi']; ?></td>
                                        <td class="text-sm py-3 px-4 text-gray-400 font-normal tracking-wide">
                                            <?php if ($data['stok_status'] === '1') { ?>
                                                <a href="?slug=<?= $data['slug']; ?>&status=0" class="py-2 px-3 bg-yellow-400 text-center text-gray-100 rounded text-sm font-medium hover:bg-yellow-500 focus:outline-none transition ease-out duration-150 focus:ring-4 focus:ring-yellow-300">Aktif</a>
                                            <?php } else { ?>
                                                <a href="?slug=<?= $data['slug']; ?>&status=1" class="py-2 px-3 bg-red-500 text-center text-gray-100 rounded text-sm font-medium hover:bg-red-600 focus:outline-none transition ease-out duration-150 focus:ring-4 focus:ring-red-300">Tidak aktif</a>
                                            <?php } ?>
                                        </td>
                                        <td class="text-sm py-3 px-4 flex items-center space-x-2">
                                            <button type="button" data-id="<?= $data['id']; ?>" data-name="<?= $data['nama']; ?>" class="show-modal-delete py-2 px-2 bg-red-500 hover:bg-red-600 rounded transition ease-out duration-150 focus:ring-4 focus:ring-red-300 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <a href="ubah-crud.php?slug=<?= $data['slug']; ?>" class="py-2 px-2 bg-green-400 hover:bg-green-500 rounded transition ease-out duration-150 focus:ring-4 focus:ring-green-300 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                    <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                                                </svg>
                                            </a>
                                        </td>
                                    </tr>
                                <?php } ?>
                            <?php } else { ?>
                                <tr>
                                    <td colspan="9" class="text-sm py-3 px-4 text-gray-400 font-normal tracking-wide">Produk tidak ditemukan!</td>
                                </tr>
                            <?php } ?>
                        </tbody>
                    </table>
                </div>


                <div class="mt-4 text-left">
                    <ul class="flex border border-gray-300 w-max rounded">
                        <?php if ($page > 1) { ?>
                            <li class="flex items-center border-r hover:bg-green-100 transition ease-out duration-150">
                                <a href="?page=<?= $page - 1; ?>" class="py-3 px-4 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/1000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                        <?php } ?>
                        <?php for ($i = 1; $i <= $halaman; $i++) { ?>
                            <?php if ($i >= $prev && $i <= $next) { ?>
                                <?php if ($page === $i) { ?>
                                    <li class="flex items-center hover:bg-green-100 transition ease-out duration-150">
                                        <a href="?page=<?= $i; ?>" class="py-3 px-4 text-sm bg-green-400 text-whi text-white hover:bg-green-500 transition duration-150 ease-out"><?= $i; ?></a>
                                    </li>
                                <?php } else { ?>
                                    <li class="flex items-center border-r hover:bg-green-100 transition ease-out duration-150">
                                        <a href="?page=<?= $i; ?>" class="py-3 px-4 text-sm text-gray-600"><?= $i; ?></a>
                                    </li>
                                <?php } ?>
                            <?php } ?>
                        <?php } ?>
                        <?php if ($page < $halaman) { ?>
                            <li class="flex items-center hover:bg-green-100 transition ease-out duration-150">
                                <a href="?page=<?= $page + 1; ?>" class="py-3 px-4 text-sm text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                        <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                    <span class="text-gray-600 text-sm tracking-tight">Halaman <?= $page; ?> dari <?= $halaman; ?>, Total <?= $jumlahData; ?> data</span>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="modal-delete" class="modal-delete hidden fixed inset-0 bg-black bg-opacity-40">
    <div class="max-w-xs sm:max-w-sm md:max-w-none md:w-4/12 lg:w-3/12 mt-8 mx-auto">
        <div class="bg-white rounded shadow-lg overflow-hidden">
            <div class="py-3 px-3 bg-red-500">
                <span class="block text-gray-100 text-lg font-medium tracking-wide">Konfirmasi?</span>
            </div>
            <div class="py-3 px-4 border-b-2 border-gray-200">
                <span class="text-sm text-gray-600">Apakah yakin ingin menghapus data produk dengan nama <span id="name-produk" class="font-medium"></span>? jika ingin menghapus klik Hapus jika tidak maka klik Batal.</span>
            </div>
            <div class="py-3 flex px-3 space-x-2 items-center justify-end">
                <form action="<?= htmlspecialchars('hapus-crud.php') ?>" method="POST">
                    <input type="hidden" name="id" id="id-produk" readonly>
                    <button type="submit" name="delete" class="py-2 px-4 text-sm font-medium bg-red-500 rounded text-gray-100 flex items-center hover:bg-red-600 transition duration-150 ease-out focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                        Hapus
                    </button>
                </form>
                <button type="button" name="delete" class="no-delete py-2 px-4 text-sm font-medium rounded bg-yellow-500 text-gray-100 flex items-center hover:bg-yellow-600 transition duration-150 ease-out focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Batal
                </button>
            </div>
        </div>
    </div>
</div>

<?php include('teamplates/footer.php'); ?>