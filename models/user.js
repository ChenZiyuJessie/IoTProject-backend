var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var Userschema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    creation_dt: {
        type: Date,
        require: true
    }
});

Userschema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

Userschema.methods.isValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('User', Userschema);