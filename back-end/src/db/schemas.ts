const mongoose = require('mongoose');

// create schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, //debug purposes
    lastlogin: Number
});

userSchema.methods.speak = function speak() {
    console.log(`I'm a talking reci[e] named ${this.name}`);
}

// create model
const User = mongoose.model('User', userSchema);

module.exports = User;
export {};