import axios from "axios"
import { TIMEOUT } from "dns"

const api = axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout: 10000,
    headers:{
        "Accept":"application/json"
    }
});

const apiIsAxiosError = axios.AxiosError

export default api;