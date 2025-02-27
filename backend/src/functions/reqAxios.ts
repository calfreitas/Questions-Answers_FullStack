import axios from 'axios';

export default function createInstanceAxios() {
    return axios.create({
        baseURL: 'http://ipN8N/webhook'
    });
}