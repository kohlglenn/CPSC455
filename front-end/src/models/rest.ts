import userCookies from "./userCookies";

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