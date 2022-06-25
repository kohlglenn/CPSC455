
const { v4: uuid } = require('uuid');

const usersInitial = [
    {
        id: "abcd123",
        name: "Steve",
        email: "steve@email.sfx",
        password: "password1"
    },
    {
        id: uuid(),
        name: "Joe",
        email: "joe@email.sfx",
        password: "password2"
    }
];


const usersMap = new Map(); //replaced with database API later


usersInitial.map(usr => usersMap.set(usr.id, usr));

const addUser = (iname: string, email: string) => {
    if (iname === undefined || email === undefined)
        throw new Error("Missing data");
    const newUser = { id: uuid(), name: iname };
    usersMap.set(newUser.id, newUser);
    return newUser.id;
}

const findUser = (uuid: string) => {
    let user = usersMap.get(uuid);
    if (user === undefined)
        throw new Error("User undefined");
    console.log(user);
    return user;
}

const authenticateUser = (email: string, password: string) => {
    if (email === undefined || password === undefined)
        throw new Error("Invalid Login");
    for (const [key, user] of usersMap) {
        if (user.email === email){
            if (user.password === password)
                return user;
            else 
                throw new Error("Invalid authentication");
        }
    }
    throw new Error("User undefined");
}

const getAll = () => {
    return Array.from(usersMap.values());
}

export default {
    addUser,
    findUser,
    authenticateUser,
    getAll
};