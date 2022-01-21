const mongoose = require('mongoose');
mongoose.Promise = Promise;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

productSchema.index({'$**': 'text'});

module.exports = mongoose.model('Product', productSchema);