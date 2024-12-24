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

axiosClient.interceptors.response.use(
    (response) => {
      return response; // Return response if it's successful
    },
    (error) => {
      let errorMessage = 'An unexpected error occurred.';
  
      // Check for specific error codes
      if (error.response) {
        // Handle errors from the server (status code is 4xx or 5xx)
        if (error.response.status === 404) {
          errorMessage = 'User not found.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = error.response.data.message || 'Something went wrong!';
        }
      } else {
        // Handle network errors (e.g., no internet connection)
        errorMessage = 'Network error. Please check your internet connection.';
      }
  
      // Throw the error message
      return Promise.reject(new Error(errorMessage));
    }
  );