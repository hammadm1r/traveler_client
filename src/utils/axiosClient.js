import axios from "axios";
import { getItem,KEY_ACCESS_TOKEN } from "./LocalStorageManager";


const REACT_APP_SERVER_BASE_URL = import.meta.env.REACT_APP_SERVER_BASE_URL;
export const axiosClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials :true,
})

axiosClient.interceptors.request.use(
    (request) =>{
        const  accessToken= getItem(KEY_ACCESS_TOKEN);
        request.headers['Authorization'] =  `Bearer ${accessToken}`; 
        return request;
    },
)