import Cookies from 'universal-cookie';
const cookies = new Cookies();

const getUser = ()=>{
    return cookies.get('user');
}

const storeUser = (uid:string) =>{
    cookies.set('user', uid, { path: '/' });
}

const logout = () =>{
    cookies.remove('user');
}

/*cookies.set('myCat', 'Pacman', { path: '/' });
console.log(cookies.get('myCat')); // Pacmang*/