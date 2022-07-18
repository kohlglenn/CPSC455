import { Restaurant } from "../models";

const Users = require('./schemas');
const mongoose = require('mongoose');

const callback = console.log();

const queries = {
   getAllUsers: async function (filter:any) {
        const users = await Users.find(filter, callback);
        return users;
    },

    getUser: async function (userid:string) {
        const user = await Users.findOne({_id: mongoose.Types.ObjectId((userid))}, callback);
        return user;
    },

    addUser: async function (content:any){
        const newUser = new Users({
            name: content.name,
            email: content.email,
            passwordHash: content.passwordHash,
            upvotes: new Map(),
            downvotes: new Map(),
            restaurantHistory: [],
            lastlogin: Date.now()
        });
        newUser.save()
        return newUser;
    },

    editUserInfo: async function (content:any){
        const user = await Users.findOneAndUpdate({id:content.id}, content);
        return user;
    },

    authenticateUser: async function(email:string, passwordHash:string){
        const user = await Users.findOne({email:email});
        console.log(user);
        if (passwordHash === user.passwordHash){
            return user;
        }
        else{
            throw new Error("Invalid Login");
        }
    },

    getUserByToken: async function (userid:string, token:string) {
        const user = await Users.findOne({_id: mongoose.Types.ObjectId((userid))}, callback);
        let unixDiff = Date.now() - user.lastlogin;
        let diffHours = unixDiff / 1000 / 60 / 60;
        if (token === user.token){
            if (diffHours > 336)
                throw new Error("Expired Token");
            return user;
        }
        throw new Error("Invalid Token");
    },

    updateUserPrefs: async function(userid:string, upvotes:string[], downvotes:string[]){
        const user = await Users.findOne({_id: mongoose.Types.ObjectId((userid))}, callback);
        const upvoteMap = user.upvotes;
        const downvoteMap = user.downvotes;
        upvotes.forEach(element => {
            upvoteMap.set(element, (upvoteMap.get(element) ?? 0) + 1 );
        });
        downvotes.forEach(element => {
            downvoteMap.set(element, (downvoteMap.get(element) ?? 0) + 1 );
        });
    },

    updateUserHistory: async function(userids:string[], restaurant:Restaurant){
        userids.forEach(async (element) => {
            const user = await Users.findOne({_id: mongoose.Types.ObjectId((element))}, callback);
            user.restaurantHistory.push(restaurant);
        });
    }

}


export {queries};