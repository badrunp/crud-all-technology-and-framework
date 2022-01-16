exports.header = function (title = 'Home') {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                *,*::before,*::after{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body{
                    background: rgba(0,0,0,.1);
                }

                .error-message{
                    color: red;
                    text-size: 18px;
                    text: center;
                }

                .container{
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .text-white{
                    color: white;
                }

                header{
                    width: 100%;
                    height: 64px;
                    border-bottom: 1px solid gray;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: black;
                }

                .navbar-menu{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    list-style: none;
                }

                .navbar-links{
                    padding: 4px 8px;
                    color: white;
                }

                .main{
                    display: flex;
                    margin: 20px 0;
                    justify-content: space-between;
                    min-height: 70vh;
                
                }

                table{
                    border: 1px solid gray;
                }

                .table-main{
                    flex: 3;
                }

                th{
                    background: gray;
                    color: white;
                }

                .table-item{
                    padding: 5px 10px;
                }

                .delete{
                    background: red;
                }

                .form-main{
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    padding: 2rem;
                }

                .form-group{
                    width: 100%;
                    margin: 10px 0;
                }

                .form-label{
                    display: block;
                    font-size: 14px;
                    margin-bottom: 5px;
                }

                .form-input{
                    display: block;
                    padding: 7px 14px;
                    border: 0;
                    width: 100%;
                }

                .button-save{
                    padding: 9px 20px;
                    cursor: pointer;
                    background: blue;
                    border: 0;
                    color: white;
                }

                .footer{
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid gray;
                    margin-top: 40px;

                    background: black;
                }

                .invalid{
                    display: block;
                    color: red;
                }

                .table-button-action{
                    display: inline-block;
                    padding: 6px 14px;
                    margin: 0 5px;
                    text-decoration: none;
                    font-size: 12px;
                    color: blue;
                    cursor: pointer;
                    color: white;
                }

                .edit{
                    background: green;
                }
            </style>
        </head>
        <body>

        <header class="container">
            <div class="navbar-left">
                <h1 class="text-white">Nodejs CRUD</h1>
            </div>
            <div class="navbar-right">
                <ul class="navbar-menu">
                    <li>
                        <a href="https://web.facebook.com/profile.php?id=100008410869285" class="navbar-links">Facebook</a>
                    </li>
                    <li>
                        <a href="https://github.com/badrunp" class="navbar-links">Github</a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/mbadrunp_/" class="navbar-links">Instagram</a>
                    </li>
                </ul>
            </div>
        </header>
                <div class="container">
    `;
};

exports.footer = function () {
  return `</div>
        <div class="footer">
            <h4 class="text-white">By: Muhammad Badrun</h4>
        </div>
    </body>
    </html>`;
};

exports.tableProduct = function (
  products = [],
  validate = {},
  value = {},
  message = '',
  product = {}
) {
  return `
            <div class="main">
                <script>
                    ${
                      message == 'deleted'
                        ? `alert('Product deleted successfully')`
                        : ''
                    }
                    ${
                      message == 'created'
                        ? `alert('Product created successfully')`
                        : ''
                    }
                    ${
                      message == 'updated'
                        ? `alert('Product updated successfully')`
                        : ''
                    }
                </script>
                <div class="table-main">

                    <h1 style="margin-bottom: 10px">Data Products</h1>
                    <table width="100%">
                        <thead>
                            <tr>
                                <th class="table-item">Name</th>
                                <th class="table-item">Price</th>
                                <th class="table-item">Description</th>
                                <th class="table-item">Category</th>
                                <th class="table-item">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${
                              products.length > 0
                                ? products
                                    .map((item) => {
                                      return `<tr>
                                            <td class="table-item">${item.name}</td>
                                            <td class="table-item">Rp. ${item.price}</td>
                                            <td class="table-item">${item.description}</td>
                                            <td class="table-item">${item.category}</td>
                                            <td class="table-item"><a href="/delete?id=${item._id}" class="table-button-action delete" onclick="return confirm('Are you sure?')">Delete</a><a href="/?id=${item._id}" class="table-button-action edit">Edit</a></td>
                                        </tr>`;
                                    })
                                    .join('')
                                : '<tr><td colspan="7" style="text-align: center" class="table-item">Products is empty!</td></tr>'
                            }
                        </tbody>
                    </table>
                </div>
                <div class="form-main">
                    <h1>${
                      Object.keys(product).length > 0 ? 'Edit' : 'Create'
                    } Product</h1>
                    <form action="/${
                      product?._id ? `?id=${product._id}` : ''
                    }" method="POST">
                        <div class="form-group">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" placeholder="Enter name product" class="form-input" id="name" name="name" value="${
                              value?.name
                                ? value?.name
                                : product?.name
                                ? product.name
                                : ''
                            }" />
                            ${
                              validate?.name
                                ? '<span class="invalid">' +
                                  validate.name +
                                  '</span>'
                                : ''
                            }
                        </div>
                        <div class="form-group">
                            <label for="price" class="form-label">Price</label>
                            <input type="text" placeholder="Enter price product" class="form-input" id="price" name="price" value="${
                              value?.price
                                ? value?.price
                                : product?.price
                                ? product.price
                                : ''
                            }" />
                            ${
                              validate?.price
                                ? '<span class="invalid">' +
                                  validate.price +
                                  '</span>'
                                : ''
                            }
                        </div>
                        <div class="form-group">
                            <label for="description" class="form-label">Description</label>
                            <textarea type="text" class="form-input" id="description" name="description" >${
                              value?.description
                                ? value?.description
                                : product?.description
                                ? product.description
                                : ''
                            }</textarea>
                            ${
                              validate?.description
                                ? '<span class="invalid">' +
                                  validate.description +
                                  '</span>'
                                : ''
                            }
                        </div>
                        <div class="form-group">
                            <label for="category" class="form-label">Category</label>
                            <input type="text" placeholder="Enter price category" class="form-input" id="category" name="category" value="${
                              value?.category
                                ? value?.category
                                : product?.category
                                ? product.category
                                : ''
                            }" />
                            ${
                              validate?.category
                                ? '<span class="invalid">' +
                                  validate.category +
                                  '</span>'
                                : ''
                            }
                        </div>
                        <button class="button-save">Save</button>
                    </form>
                </div>
            </div>

        `;
};
