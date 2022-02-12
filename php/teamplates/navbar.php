<div class="w-full bg-green-500 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex item-center w-full h-14 sm:h-16 antialiased ">
            <div class="flex items-center justify-between w-full">
                <a href="index.php" class="flex items-center space-x-2">
                    <div class="overflow-hidden">
                        <img src="https://img.icons8.com/office/40/000000/bookmark--v1.png" alt="" class="w-7 h-7 md:h-9 md:w-9">
                    </div>
                    <span class="block text-gray-100 font-medium text-2xl uppercase hidden sm:block">php prosedural (crud)</span>
                </a>


                <ul class="flex items-center space-x-0 h-full sm:space-x-2">
                    <li class="flex items-center justify-center h-full border-b-2 hover:border-green-700 border-transparent <?= $current_page == "index" ? 'border-green-700' : '' ?>">
                        <a href="index.php" class="flex items-center h-full text-gray-100 text-base font-medium hover:font-bold hover:text-white px-2 hover:bg-green-700 hover:bg-opacity-10 tracking-wide">Home</a>
                    </li>
                    <li class="flex items-center justify-center h-full border-b-2 hover:border-green-700 border-transparent <?= $current_page == "crud" ? 'border-green-700' : '' ?>">
                        <a href="tampil-crud.php" class="flex items-center h-full text-gray-100 text-base font-medium hover:font-bold hover:text-white px-2 hover:bg-green-700 hover:bg-opacity-10 tracking-wide">Crud</a>
                    </li>
                    <li class="flex items-center justify-center h-full border-b-2 hover:border-green-700 border-transparent <?= $current_page == "kontak" ? 'border-green-700' : '' ?>">
                        <a href="kontak.php" class="flex items-center h-full text-gray-100 text-base font-medium hover:font-bold hover:text-white px-2 hover:bg-green-700 hover:bg-opacity-10 tracking-wide">Kontak</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>