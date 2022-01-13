
(function () {

    const formCari = document.getElementById('form-cari')
    const inputCari = document.getElementById('input-cari')

    inputCari.addEventListener('focus', function () {
        formCari.classList.remove('border-gray-300')

        formCari.classList.add('border-blue-600')
        formCari.classList.add('ring-2')
    })

    inputCari.addEventListener('blur', function () {
        formCari.classList.add('border-gray-300')

        formCari.classList.remove('border-blue-600')
        formCari.classList.remove('ring-2')
    })

})()



class ProductDomain {
    constructor(id, name, price, description, category) {
        this.id = id
        this.name = name
        this.price = price
        this.description = description
        this.category = category
    }
}

class Helper {
    static flashMessage(message = '') {
        if (message != '') {
            getElById('alert-message').textContent = message
        }

        removeClassNameById('alert-success', '-translate-y-20')
        addClassNameById('alert-success', 'translate-y-3')

        setTimeout(() => {
            addClassNameById('alert-success', '-translate-y-20')
            removeClassNameById('alert-success', 'translate-y-3')
        }, 3000)
    }
}

class Product {
    static getProducts() {
        return JSON.parse(localStorage.getItem('products')) || []
    }

    static loadProducts(data = []) {
        const products = data.length > 0 ? data : this.getProducts();

        if (!products.length < 1) {

            this.clearProductHtml()
            return products.map((item) => {
                this.renderProduct(item)
            })

        }

        return this.productNotFound("Produk masih kosong!")
    }

    static renderProduct({
        id,
        name,
        price,
        category
    }) {
        const listProducts = document.getElementById('list-products')
        const tr = document.createElement('tr')

        tr.classList.add('hover:bg-gray-100')
        tr.innerHTML = `
            <td class="py-2 px-4 text-sm tracking-normal">${id}</td>
            <td class="py-2 px-4 text-sm tracking-normal">${name}</td>
            <td class="py-2 px-4 text-sm tracking-normal">Rp. ${price}</td>
            <td class="py-2 px-4 text-sm tracking-normal">${category}</td>
            <td class="py-2 px-4 text-sm tracking-normal text-center relative">
                <button class="mx-auto p-2 rounded-full hover:bg-gray-200 focus:outline-none" onclick="handleShowAction(${id})">
                    <img src="./images/icons/more-svgrepo-com.svg" alt="more-icon" class="h-5">
                </button>

                <div id="${id}-dropdown" class="dropdown-menu dropdown-menu-action hidden z-20 bg-white absolute top-0 right-4 shadow-md rounded-lg ring-1 ring-gray-300 overflow-hidden mt-8 w-40 divide-y divide-gray-300">
                    <button class="dropdown-menu-action flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 transition ease-in-out w-full" onclick="handleOpenModalEdit(${id})">
                        <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-menu-action h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span class="dropdown-menu-action block text-sm">Ubah</span>
                    </button>
                    <button class="dropdown-menu-action flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 transition ease-in-out w-full" onclick="handleOpenModalDelete(${id})">
                        <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-menu-action h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span class="dropdown-menu-action block text-sm">Hapus</span>
                    </button>
                    <button class="dropdown-menu-action flex items-center space-x-1 px-3 py-2 hover:bg-gray-100 transition ease-in-out w-full" onclick="handleModalDetail(${id})">
                        <svg xmlns="http://www.w3.org/2000/svg" class="dropdown-menu-action h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span class="dropdown-menu-action block text-sm">Detail</span>
                    </button>
                </div>
            </td>
        `

        listProducts.append(tr)
    }

    static productNotFound(message) {
        const listProducts = document.getElementById('list-products')

        listProducts.innerHTML = `
            <tr>
                <td colSpan="5" class="py-4 px-4 text-sm tracking-normal text-center">${message}</td>
            </tr>
        `
    }

    static clearProductHtml() {
        document.getElementById('list-products').innerHTML = ''
    }

    static saveProduct({
        id,
        name,
        price,
        description,
        category
    }) {

        const products = this.getProducts();

        products.push({
            id,
            name,
            price,
            description,
            category
        })

        localStorage.setItem('products', JSON.stringify(products))

        this.loadProducts()

    }

    static validate(data) {

        let array = []

        data.map(({ label, value, fieldName, required }) => {
            if (required) {
                if (value == '' || value.length < 1) {
                    removeClassNameById(label, "border-gray-300")
                    addClassNameById(label, "ring-red-300")
                    addClassNameById(label, "focus:border-red-500")
                    addClassNameById(label, "border-red-500")

                    document.getElementById(`${label}-invalid`).textContent = `${firtUppercaseLetter(fieldName)} tidak boleh kosong!`
                    removeClassNameById(`${label}-invalid`, 'hidden')

                    array.push(label)
                } else {

                    addClassNameById(label, "border-gray-300")
                    removeClassNameById(label, "ring-red-300")
                    removeClassNameById(label, "focus:border-red-500")
                    removeClassNameById(label, "border-red-500")

                    addClassNameById(`${label}-invalid`, 'hidden')

                    const newArray = array.filter((item) => item != label)
                    array = newArray

                }
            }
        })

        return array;

    }

    static clearInput() {
        getElById('name').value = ''
        getElById('price').value = ''
        getElById('description').value = ''
        getElById('category').value = ''
        getElById('id').value = ''

        editFormTitle('tambah', 'Tambah Produk')
    }

    static findByIdProduct(id) {
        const products = this.getProducts();

        const product = products.find((item) => item.id == id);

        if(product){
            return product
        }

        return;
    }

    static deleteProduct(id, cb) {

        if (id != undefined || id != null) {

            const products = this.getProducts();
            const newProduct = products.filter((item) => item.id != id);
            localStorage.setItem('products', JSON.stringify(newProduct))

            this.loadProducts()

            cb()

        } else {
            alert("Something wrong!")
        }

    }

    static updateProduct({
        id,
        name,
        price,
        description,
        category
    }){

        const product = this.findByIdProduct(id)
        if(product){
            const products = this.getProducts()

            const newProducts = products.map((item) => {
                if(item.id == id){
                    return {
                        id,
                        name,
                        price,
                        description,
                        category
                    }
                }

                return item;
            })

            localStorage.setItem('products', JSON.stringify(newProducts))

            this.loadProducts()
            this.clearInput()

            Helper.flashMessage('Mengubah produk berhasil')
        }else{
            window.location.href = '/'
        }

    }

}

getElById('form-input').addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.id == 'simpan') {

        const form = e.target.form;
        const id = new Date().getTime()
        const name = form[0].value.trim()
        const price = form[1].value.trim()
        const description = form[2].value.trim()
        const category = form[3].value.trim()
        const productId = getElById('id').value.trim()
        
        const isValid = Product.validate([
            {
                label: 'name',
                value: name,
                fieldName: 'nama',
                required: true
            },
            {
                label: 'price',
                value: price,
                fieldName: 'harga',
                required: true
            },
            {
                label: 'description',
                value: description,
                fieldName: 'deskripsi',
                required: true
            },
            {
                label: 'category',
                value: category,
                fieldName: 'kategori',
                required: true
            },
        ])

        if (Object.keys(isValid).length < 1) {
            const product = new ProductDomain(productId ? parseInt(productId) : id, name, price, description, category)
            if(productId != ""){
                Product.updateProduct(product)
            }else{
                Product.saveProduct(product)
            }


            Product.clearInput()
            Helper.flashMessage()
        }
    }


})

getElById('button-modal-delete-product').addEventListener('click', function (e) {
    e.preventDefault();

    const id = parseInt(getElById('modal-delete').getAttribute('data-id'))

    Product.deleteProduct(id, function () {
        Helper.flashMessage("Menghapus produk berhasil")

        removeModal()

    })
})

getElById('button-modal-cancel').addEventListener('click', function(){
    removeModal()
})


function handleOpenModalDelete(id) {
    removeClassNameById('overlay', 'hidden')

    const modalDelete = getElById('modal-delete')
    modalDelete.classList.remove('hidden');
    modalDelete.setAttribute('data-id', id)

    checkDropdownMenuAction()
}

function handleOpenModalEdit(id){

    const product = Product.findByIdProduct(parseInt(id))
    if(product){
        editFormTitle('edit', 'Ubah Produk')

        getElById('id').value = product.id
        getElById('name').value = product.name
        getElById('price').value = product.price
        getElById('category').value = product.category
        getElById('description').value = product.description

        checkDropdownMenuAction()
    }

}

function handleModalDetail(id){

    removeClassNameById('modal-edit', 'hidden')
    removeClassNameById('overlay', 'hidden')
    const {
        id: idProduct,
        name,
        price,
        description,
        category
    } = Product.findByIdProduct(parseInt(id))
    getElById('product-detail-id').textContent = idProduct
    getElById('product-detail-name').textContent = name
    getElById('product-detail-price').textContent = price
    getElById('product-detail-description').textContent = description
    getElById('product-detail-category').textContent = category


}

getElById('overlay').addEventListener('click', function () {
    removeModal()
})

getElById('cancel-edit-button').addEventListener('click', function(){
    Product.clearInput()
})

const dataShowAcion = {}
const dataShowSorting = {}
const dataShowPage = {}

function handleShowAction(id) {
    checkDropdownMenuAction()

    removeClassNameById(`${id}-dropdown`, 'hidden')
    dataShowAcion.idProduct = id
    dataShowAcion.time = new Date().getTime()
    dataShowAcion.isOpen = true
}

getElById('button-dropdown-sorting').addEventListener('click', function () {
    removeClassNameByClass('dropdown-menu-sorting', 'hidden')
    dataShowSorting.time = new Date().getTime()
    dataShowSorting.isOpen = true
})

getElById('button-dropdown-page').addEventListener('click', function () {
    removeClassNameByClass('dropdown-menu-page', 'hidden')
    dataShowPage.time = new Date().getTime()
    dataShowPage.isOpen = true
})

document.addEventListener('click', function (e) {

    closeDropdown(
        e,
        dataShowAcion,
        'dropdown-menu-action',
        `${dataShowAcion.idProduct}-dropdown`,
        'id',
        function () {
            dataShowAcion.isOpen = false
        }
    )

    closeDropdown(
        e,
        dataShowSorting,
        'dropdown-sorting',
        'dropdown-menu-sorting',
        'class',
        function () {
            dataShowSorting.isOpen = false
        }
    )

    closeDropdown(
        e,
        dataShowPage,
        'dropdown-page',
        'dropdown-menu-page',
        'class',
        function () {
            dataShowPage.isOpen = false
        }
    )
})

function closeDropdown(
    e,
    data,
    chekClassName,
    className,
    type,
    cb
) {
    if (data.isOpen) {
        if (!e.target.classList.contains(chekClassName)
            && data.time < new Date().getTime()) {
            if (type == 'class') {

                addClassNameByClass(className, 'hidden')
            } else {
                const items = document.querySelectorAll('.dropdown-menu')
                items.forEach((item) => {
                    if (!item.classList.contains('hidden')) {
                        item.classList.add('hidden')
                    }
                })
            }
            cb()
        }
    }
}

function checkDropdownMenuAction() {
    const items = document.querySelectorAll('.dropdown-menu')
    items.forEach((item) => {
        if (!item.classList.contains('hidden')) {
            item.classList.add('hidden')
        }
    })
}

function getElById(id) {
    return document.getElementById(id)
}

function getElByClass(className) {
    return document.querySelector(`.${className}`)
}

function addClassNameById(id, className) {
    getElById(id).classList.add(className)
}

function addClassNameByClass(className, newClassName) {
    getElByClass(className).classList.add(newClassName)
}

function removeClassNameById(id, className) {
    getElById(id).classList.remove(className)
}

function removeClassNameByClass(className, newClassName) {
    getElByClass(className).classList.remove(newClassName)
}

function firtUppercaseLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

function editFormTitle(type = '', title = ''){
    if(type == 'edit'){
        removeClassNameById('cancel-edit-button', 'hidden')
    }else{
        addClassNameById('cancel-edit-button', 'hidden')
    }

    getElById('form-title').textContent = title
}

function removeModal() {
    addClassNameById('overlay', 'hidden')
    addClassNameById('modal-delete', 'hidden')
    addClassNameById('modal-edit', 'hidden')
}


document.addEventListener('DOMContentLoaded', Product.loadProducts())