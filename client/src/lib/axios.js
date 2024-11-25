import axios from 'axios'

const axiosInstance = axios.create({

    //TODO:base url
    baseURL:"http://localhost:3000",
    withCredentials:true,
})

export default axiosInstance;