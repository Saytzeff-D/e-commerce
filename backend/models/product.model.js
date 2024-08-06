const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    product: String,
    desc:  String,
    price: String,
    imageUrl: String,
    createdBy: mongoose.Schema.Types.ObjectId
})

let productModel = mongoose.model('menus', productSchema)
module.exports = productModel