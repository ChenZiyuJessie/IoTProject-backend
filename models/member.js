var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MemberSchema = new Schema({
    room: {
        type: String,
        required: true

    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Member', MemberSchema);