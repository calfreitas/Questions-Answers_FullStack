import axios from 'axios';

export default function createInstanceAxios() {
    return axios.create({
        baseURL :  process.env.N8NWEBHOOK
    }); 
}