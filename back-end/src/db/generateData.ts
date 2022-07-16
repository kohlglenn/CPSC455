const User = require('./schemas');

function generateData() {
    const admin1 = new User(
        {
        name: "Steve",
        email: "steve@email.sfx",
        password: "password1"
    },);
    const admin2 = new User({
            name: "Joe",
            email: "joe@email.sfx",
            password: "password2"
        });


    admin1.save();
    admin2.save();
    console.log("data generated!");
}

export {generateData};