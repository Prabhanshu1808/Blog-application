//isLogin=>
export const isLoggedIn =()=> {
    let data = localStorage.getItem("data")
    if(data != null)  return true;
    else return false;
    
}

//doLogin => data => set-to-localStorage
export const doLogin = (data , next) => {
    localStorage.setItem("data" , JSON.stringify(data));
    next();
}

//doLogout => remove from localStorage
export const doLogout = (next) => {
    localStorage.removeItem("data")
    next();
}

//get current User
export const getCurrentUserDetail = () => {
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).user;
    }
    else{
        return undefined;
    }
}

export const getToken = () => {
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data")).token;
    }
    else{
        return null;
    }
}