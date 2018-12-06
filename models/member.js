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
     // bcrypt.hashSync 每次生成的hash都不相同
    // 验证密码时从hash中取出salt，和密码再hash一次才可以匹配
    var pwdHashedCompare = false;
    if (password) {
        var salt = this.password.substring(0, 29);
        var newHashedPassword = bcrypt.hashSync(password, salt);
        pwdHashedCompare = newHashedPassword == this.password;
    }
    return password == this.password || pwdHashedCompare || token == this.token;
}

module.exports = mongoose.model('Member', Memberschema);