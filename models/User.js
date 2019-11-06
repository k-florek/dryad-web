const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let passportLocalMongoose = require('passport-local-mongoose');

let UserSchema = new Schema({
    username: String,
    password: String,
    group: String,
    admin: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
