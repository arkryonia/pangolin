const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator')

// User schema
const UserSchema = mongoose.Schema({
    name: {
        type:String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        require: true
    },
    username:{
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    }
})

UserSchema.plugin(uniqueValidator)

const User = module.exports = mongoose.model('User', UserSchema)

// find user by id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

module.exports.getUserByUsername = function(username, callback) {
    User.findOne({ "username": username}, callback)
}

// register the user
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser.save(callback)
        })
    })
}

// Compare password
module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch)
    })
}
