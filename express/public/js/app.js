$(document).ready(function(){
    const params = new URLSearchParams(window.location.search)
    $('#search').on('keyup', function(e){
        const value = e.target.value ? e.target.value : undefined
        const page = params.has('page') ? params.get('page') : 1;
        $.ajax({
            url: "http://localhost:4000/search?search="+value+'&page='+page,
            method: "GET",
            success: function(result){
                const {products, limit, page} = result;
                console.log(result);
                if(products.length > 0){
                    let htmlProduct = `
                ${products.map(item => {
                    return `
                            <tr class="text-center bg-white">
                            <td class="py-3 px-5 text-xs tracking-wide leading-6 text-gray-400 font-normal">${item.name}</td>
                            <td class="py-3 px-5 text-xs tracking-wide leading-6 text-gray-400 font-normal">${item.price}</td>
                            <td class="py-3 px-5 text-xs tracking-wide leading-6 text-gray-400 font-normal">${item.quantity}</td>
                            <td class="py-3 px-5 text-xs tracking-wide leading-6 text-gray-400 font-normal">${item.category}</td>
                            <td class="py-3 px-5 text-xs tracking-wide leading-6 text-gray-400 font-normal">${item.description}</td>
                            <td class="py-3 px-5 text-xs tracking-wide leading-6 text-gray-400 font-normal flex space-x-2">
                                    <form action="/product/${item._id}?_method=DELETE" method="POST">
                                        <button onclick="return confirm('Are you sure?')" class="bg-red-500 text-white p-2 rounded">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                                              </svg>
                                            </button>
                                    </form>
                                    <a href="/product/${item._id}" class="bg-green-500 text-white p-2 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                            <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
                                          </svg>
                                    </a>
                                </td>
                            </tr>
                            `;
                    
                })}
            `;

            $('#product-list').html(htmlProduct)

            
                }else{
                    $('#product-list').html(`<tr><td colspan="6" class="text-center py-3 text-gray-600 px-3 text-sm font-medium" ><span class="font-bold">${e.target.value}</span> product not result</td></tr>`)
                }

                if(limit > 0 && limit !== null){
                    let htmlPaginate = ``;
                    if(page-1 !== 0){
                        htmlPaginate += `<a href="?page=${page-1}" class="py-2 px-3 border boredr-gray-300 rounded text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                    </a>`
                    }
                    let prev = page -1;
                    let next = page +1;
                    for(let i = 0; i < limit; i++){
                        if(page !== null){
                           if(i+1 >= prev && i+1 <= next){
                            if(i == page-1){
                                htmlPaginate += `<a href="?page=${i+1}" class="py-2 px-3 border boredr-transparent bg-indigo-600 text-white rounded text-sm">${i+1}</a>`
                            }else{
                                htmlPaginate += `<a href="?page=${i+1}" class="py-2 px-3 border boredr-gray-300 rounded text-sm">${i+1}</a>`
                            }
                           }
                        }
                    }
                    if(page !== limit){
                        htmlPaginate += `<a href="?page=${page+1}" class="py-2 px-3 border boredr-gray-300 rounded text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                  </svg>
                    </a>`
                    }
                    $('#navigation-product').html(htmlPaginate)
                }else{
                    $('#navigation-product').html('')
                }
            }
        })
    })


    // console.log(params.get('page'));
})