var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


var Memberschema = new Schema({
    room: {
        type: String,
        require: true
    },
    membername: {
        type: String,
        require: true
    },
    mail: {
        type: String,
        require: true
    },
    tel: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    credit: {
        type: Number,
        require: true
    },
    creation_dt: {
        type: Number,
        require: true
    },
    token: {
        type: String,
        require: false
    },
    waterFlow: {
        type: Number,
        required: false
    }
});

Memberschema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

Memberschema.methods.isPasswordValid = function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword, this.password);
}

Memberschema.methods.isAuthorized = function(password, token) {
    return password == this.password || token == this.token;
}

module.exports = mongoose.model('Member', Memberschema);