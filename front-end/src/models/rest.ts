import userCookies from "./userCookies";

const userid = userCookies.getUser();
const url = "http://localhost:5000" + '/users/' + userid;

export const getUserAsync = async () => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
};