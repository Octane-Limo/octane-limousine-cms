
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://octane-limousine-backend-lovat.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// import axios from 'axios';
// import Cookies from 'js-cookie';

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE || 'http://localhost:3000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = Cookies.get('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;
    
//     // Handle unauthorized errors
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       Cookies.remove('token');
//       window.location.href = '/';
//       return Promise.reject(error);
//     }
    
//     // Handle other errors
//     const errorMessage = error.response?.data?.message || 
//                        error.message || 
//                        'An unexpected error occurred';
//     return Promise.reject(new Error(errorMessage));
//   }
// );

// export default axiosInstance;
