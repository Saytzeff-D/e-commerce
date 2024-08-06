const mongoose = require('mongoose')
let userSchema = mongoose.Schema({
    email: String,
    username:  String,
    password: String,
})

let userModel = mongoose.model('users', userSchema)

module.exports = userModel