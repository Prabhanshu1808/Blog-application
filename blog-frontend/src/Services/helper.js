import axios from 'axios'
import { getToken } from '../auth';


export const BASE_URL='http://blogapp1-env.eba-kmg8mckc.us-east-1.elasticbeanstalk.com/';
const token = getToken();
export const myAxios = axios.create({
    baseURL:BASE_URL,
    
})



export const privateAxios = axios.create({
    baseURL:BASE_URL,
})

privateAxios.interceptors.request.use((config) => {  
    console.log(token)
    if(token){
        config.headers.Authorization =  `Bearer ${token}`
        
    }
    else{
        return console.log("You are unauthorize")
    }
    return config;
    
})