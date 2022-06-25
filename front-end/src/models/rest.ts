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
    const userid = userCookies.getUser();
    const url = "http://localhost:5000" + '/users/login';

    return fetch(url, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })
};
