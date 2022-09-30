const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    nameUser: {type:String, required:true},
    lastNameUser: {type:String, required:true},
    photoUser: {type:String, required:true},
    mail: {type:String, required:true},
    password: {type:Array, required:true},
    from: {type:Array, required:true},
    country: {type:String, required:true},
    verification: {type:Boolean, required:true},
    uniqueString: {type:String, required:true},
})

const User = mongoose.model('users',userSchema)
module.exports = User