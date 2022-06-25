import Cookies from 'universal-cookie';
const cookies = new Cookies();

const getUser = ()=>{
    return "abcd123";
    //return cookies.get('user');
}

const storeUser = (uid:string) =>{
    cookies.set('user', uid, { path: '/' });
}

const logout = () =>{
    cookies.remove('user');
}

export default {
    getUser,
    storeUser,
    logout
}
/*cookies.set('myCat', 'Pacman', { path: '/' });
console.log(cookies.get('myCat')); // Pacmang*/