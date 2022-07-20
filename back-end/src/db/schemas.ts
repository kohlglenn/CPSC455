const mongoose = require('mongoose');

import { Restaurant } from "../models";


// create schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String, //debug purposes
    upvotes: Map,
    downvotes: Map,
    restaurantHistory: [],
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