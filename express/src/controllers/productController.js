
const Product = require("../models/Product")

exports.productsController = (req,res) => {
    const pageOptions = {
        page: parseInt(req.query.page) || 1,
        limit: 5
    }
    
        Product.find({})
            .then(countProducts => {
                Product.find({})
                    .skip((pageOptions.page - 1) * pageOptions.limit)
                    .limit(pageOptions.limit)
                    .then(products => {
                        if(products){
                            res.render('product/index', {
                                title: "Products",
                                limit: Math.ceil(countProducts.length / pageOptions.limit),
                                products,
                                page: pageOptions.page,
                                countProducts: countProducts.length
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                })
                .catch(error => {
                    res.redirect('/')
                    console.log(error);
            })
    
}

exports.productCreateController = (req,res) => {
    res.render('product/create', {
        title: "Product Create",
        categories: [
            {value: "mobile", name: "Mobile"},
            {value: "electronics", name: "Electronics"},
            {value: "men", name: "Men"},
            {value: "women", name: "Women"},
            {value: "sports", name: "Sports"},
        ]
    })
}


exports.productSearchController = (req,res) => {
    const pageOptions = {
        page: parseInt(req.query.page) || 1,
        limit: 5
    }

        
    if(req.query.search !== "undefined"){
        console.log("Ada");
        Product.find({$text: {$search: req.query.search}})
            // .skip((pageOptions.page - 1) * pageOptions.limit)
            // .limit(pageOptions.limit)
            .then(products => {
                if(products){
                    console.log(products);
                    res.status(200).json({
                        products,
                        limit: null,
                        page: null
                    })
                }
            })
            .catch(error => {
                res.redirect('/')
                console.log(error);
            })
    }else{
            Product.find({})
            .then(countProducts => {
                Product.find({})
                .skip((pageOptions.page - 1) * pageOptions.limit)
                .limit(pageOptions.limit)
                .then(products => {
                    if(products){
                        res.status(200).json({
                            limit: Math.ceil(countProducts.length / pageOptions.limit),
                            products,
                            page: pageOptions.page
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            })
        
    }
}

exports.productStoreController = (req,res) => {
    const errors = handleErrorMessages(req);
    const inputOldValues = handleInputValues(req);

    if(Object.keys(errors).length > 0){
        req.session.message = errors;
        req.session.inputOldValues = inputOldValues;
        res.redirect('/');
    }

    const {name, price, quantity, category, description} = req.body;

    Product.findOne({name: name})
        .then(product => {
            if(!product){
                const newProduct = new Product({
                    name,   
                    price,
                    quantity,
                    category,
                    description
                });

                newProduct.save()
                    .then(result => {
                        req.session.message = "Product successfuly created"
                        res.redirect('/');
                    })
                    .catch(error => {
                        console.log(error);
                        req.session.error = error;
                    })
            }else{
                req.session.error = error = {message: "Product name is unique!"}
                res.redirect('/create');
            }
        })
        .catch(error => {
            res.redirect('/')
            console.log(error);
            req.session.error = error;
        })
    

}

exports.productUpdateController = (req,res) => {
    Product.findOne({_id: req.params.products })
        .then(product => {
            if(product){
                console.log(product);
                res.render('product/update', {
                    product,
                    title: "Update Product",
                    categories: [
                        {value: "mobile", name: "Mobile"},
                        {value: "electronics", name: "Electronics"},
                        {value: "men", name: "Men"},
                        {value: "women", name: "Women"},
                        {value: "sports", name: "Sports"},
                    ]
                })
            }else{
                res.redirect('/')
            }
        })
        .catch(error => {
            res.redirect('/')
            console.log(error);
        })
}

exports.productInsertController = (req,res) => {
    const errors = handleErrorMessages(req);
    const inputOldValues = handleInputValues(req);


    if(Object.keys(errors).length > 0){
        req.session.message = errors;
        req.session.inputOldValues = inputOldValues;
        res.redirect('/' + req.body._id);
    }

    const {_id, name, price, quantity, category, description} = req.body;

    Product.findOne({_id: _id})
        .then(product => {
            if(product){
                Product.findOneAndUpdate({_id: _id}, {
                    name,
                    price,
                    quantity,
                    category,
                    description
                })
                    .then(result => {
                        if(result){
                            req.session.message = "Product successfuly updated"
                            res.redirect('/');
                        }
                    })
                    .catch(error => {
                        res.redirect('/')
                        console.log(error);
                    })
            }else{
                req.session.error = "Failed Updated!";
                res.redirect('/');
            }
        })
        .catch(error => {
            res.redirect('/')
            console.log(error);
        })
}

exports.productDeleteController = (req,res) => {
    
    const {id} = req.params;
    if(id){
        Product.findOne({ _id: id})
            .then(product => {
                if(product){
                    Product.findOneAndDelete({_id: id})
                        .then(result => {
                            if(result){
                                req.session.message = "Product successfuly deleted"
                                res.redirect('/');
                            }else{
                                req.session.error = "Failed Deleted!";
                                res.redirect('/')
                            }
                        })
                }else{
                    req.session.error = "Failed Deleted!";
                    res.redirect('/')
                }
            })
            .catch(error => {
                req.session.error = "Failed Deleted!";
                res.redirect('/')
                console.log(error);
            })
    }else{
        req.session.error = "Failed Deleted!";
        res.redirect('/');
    }

}

function handleErrorMessages(req){
    const errorObj = {};
    if(!req.body.name){
        errorObj.name = "Name is required";
    }
    if(!req.body.price){
        errorObj.price = "Price is required";
    }
    if(!req.body.quantity){
        errorObj.quantity = "Quantity is required";
    }
    if(!req.body.category){
        errorObj.category = "Category is required";
    }
    if(!req.body.description){
        errorObj.description = "Description is required";
    }
    return errorObj;
}

function handleInputValues(req){
    const valuesObj = {};

    if(req.body.name){
        valuesObj.name = req.body.name;
    }
    if(req.body.price){
        valuesObj.price = req.body.price;
    }
    if(req.body.quantity){
        valuesObj.quantity = req.body.name;
    }
    if(req.body.category){
        valuesObj.category = req.body.category;
    }
    if(req.body.description){
        valuesObj.description = req.body.description;
    }

    return valuesObj;
}

