import { ObjectHTMLAttributes } from "react";
import userCookies from "./userCookies";

//change stuff to use .env instead of hardcode address
export const getUserAsync = async () => {
    const userid = userCookies.getUser();
    const url = "http://localhost:5000" + '/users/' + userid;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

export const userLoginAsync = async(info:Object) =>{
    const url = "http://localhost:5000" + '/users/login';

    return fetch(url, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
};

export const userCreateAsync = async(info:Object) =>{
    const url = "http://localhost:5000" + '/users/createuser';

    return fetch(url, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
};

export const getLobbyAsync = async (id: String) => {
    const response = await fetch(`http://localhost:5000/lobby/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg);
    }

    return data;
}


export const addLobbyAsync = async (lobby: Object) => {
    const response = await fetch('http://localhost:5000/lobby', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lobby)
    })
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg);
    }

    return data;
}

export const addLobbyUsersAsync = async (user: Object) => {
    const response = await fetch('http://localhost:5000/lobby/addUser', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
    })

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg);
    }

    return data;
}

export const updateFiltersAsync = async (filters: Object) => {
    const response = await fetch('http://localhost:5000/lobby/updateLobby', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters),
    })

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg);
    }

    return data;
}