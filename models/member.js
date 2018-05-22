var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var Memberschema = new Schema({
    room: { type: String, require: true },
    membername: { type: String, require: true },
    email: { type: String, require: true },
    tel: { type: String, require: true },
    password: { type: String, require: true },
    creation_dt: { type: Date, require: true }
});

Memberschema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

Memberschema.methods.isPasswordValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}


module.exports = mongoose.model('Member', Memberschema);