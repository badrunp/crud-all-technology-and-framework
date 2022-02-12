(function(){

    const nama = document.getElementById('nama') ? document.getElementById('nama') : null;
    const slug = document.getElementById('slug') ? document.getElementById('slug') : null;
    if(nama !== null){
        nama.addEventListener('keyup', function(){
            if(slug){
                let value = nama.value;
                value = value.toLowerCase();
                value = value.replace(/[^a-zA-Z0-9]+/g,'-');
                slug.value = value;
            }
        })
    }

    const showModalDelete = document.querySelectorAll(".show-modal-delete") ? document.querySelectorAll(".show-modal-delete") : null;
    const modalDelete = document.getElementById("modal-delete") ? document.getElementById("modal-delete") : null;
    const inputId = document.getElementById('id-produk') ? document.getElementById('id-produk') : null;
    const produkName =  document.getElementById('name-produk') ? document.getElementById('name-produk') : null; 
    if(showModalDelete){
        showModalDelete.forEach((item, i) => {
            item.addEventListener('click', function(e){
                const id = item.getAttribute('data-id');
                const name = item.getAttribute('data-name');
                inputId.value = id;
                produkName.textContent = name;
                modalDelete.classList.remove('hidden');
            })
        });
    }

    document.addEventListener('click', function(e){
        if(e.target.classList.contains('modal-delete') || e.target.classList.contains('no-delete')){
            modalDelete.classList.add('hidden');
        }
    })

})()