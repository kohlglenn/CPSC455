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
            lastlogin: Date.now()
        });
        newUser.save()
        return newUser;
    },

    authenticateUser: async function(email:string, password:string){
        const user = await Users.findOne({email:email});
        console.log(user);
        if (password === user.password){
            return user;
        }
        else{
            throw new Error("Invalid Login");
        }
    }


}


export {queries};