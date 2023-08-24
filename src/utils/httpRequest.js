import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data = {}) => {
    const response = await httpRequest.post(path, data);
    return response.data;
};

export const logout = async (path, options = {}) => {
    const response = await httpRequest.post(path, null, options);
    return response.data;
};


export const curuser = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
