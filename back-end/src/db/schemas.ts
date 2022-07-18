const mongoose = require('mongoose');

const Restaurant = require("../models/Restaurant");

// create schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String, //debug purposes
    upvotes: Map,
    downvotes: Map,
    restaurantHistory: [Restaurant],
    lastlogin: Number,
    token: String
});

userSchema.methods.speak = function speak() {
    console.log(`I'm a talking user named ${this.name}`);
}

// create model
const User = mongoose.model('User', userSchema);

module.exports = User;
export {};