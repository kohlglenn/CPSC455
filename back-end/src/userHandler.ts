
const { v4: uuid } = require('uuid');

const usersInitial = [
    {
        id: uuid(),
        name: "Steve"
    },
    {
        id: uuid(),
        name: "Joe"
    }
];


const usersMap = new Map(); //replaced with database API later


usersInitial.map(usr => usersMap.set(usr.id, usr));

const addUser = (iname: string) => {
    if (iname === undefined)
        throw new Error("Name undefined");
    const newUser = { id: uuid(), name: iname };
    usersMap.set(newUser.id, newUser);
    return newUser.id;
}

const findUser = (uuid: string) => {
    let user =  usersMap.get(uuid);
    if (user === undefined)
        throw new Error("User undefined");
    return user;
}

const getAll = () => {
    return Array.from(usersMap.values());
}

export default {
    addUser,
    findUser,
    getAll
};