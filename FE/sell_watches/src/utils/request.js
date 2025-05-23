import axios from "axios"

const request = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const post = async (path, data, option = {}) => {
    const response = await request.post(path, data, option)
    return response.data;
}

export const get = async (path, data, option = {}) => {
    const response = await request.get(path, data, option)
    return response.data;
}

export default request;
