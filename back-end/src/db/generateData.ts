const User = require('./schemas');


function generateData() {
    const admin1 = new User(
        {
        name: "Steve",
        email: "steve@email.sfx",
        passwordHash: "password1",
        lastlogin: Date.now()
    },);
    const admin2 = new User({
            name: "Joe",
            email: "joe@email.sfx",
            passwordHash: "password2",
            lastlogin: Date.now()
        });


    admin1.save();
    admin2.save();
    console.log("data generated!");
}

export {generateData};