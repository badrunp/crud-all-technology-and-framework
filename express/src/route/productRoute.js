const express = require('express');
const { productsController, productCreateController, productStoreController, productUpdateController, productInsertController, productDeleteController, productShortController, productSearchController } = require('../controllers/productController');

const route = express.Router();

route.get('/', productsController);
route.get('/create', productCreateController);
route.post('/store', productStoreController);
route.get('/search', productSearchController);
route.put('/insert', productInsertController);
route.get('/:products', productUpdateController);
route.delete('/:id', productDeleteController);

module.exports = route;