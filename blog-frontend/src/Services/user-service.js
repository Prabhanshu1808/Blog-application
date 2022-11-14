import { myAxios } from "./helper";

export const signUp = (user)=>{
    return myAxios.post('/api/auth/register',user).then((response) => response.data)
}

export const loginUser = (logindetail) => {
    return myAxios.post('/api/auth/login',logindetail).then((response) => response.data) 
}

