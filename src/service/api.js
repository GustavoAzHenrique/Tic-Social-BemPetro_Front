import axios from "axios";

const api = axios.create({
    baseURL: "http://169.57.150.59:8008",
});



export default api;