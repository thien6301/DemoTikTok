import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, body = {}, options = {}) => {
    const response = await httpRequest.post(path, body, options);
    return response.data;
};

export const logout = async (path, options = {}) => {
    const response = await httpRequest.post(path, null, options);
    return response.data;
};

export const patch = async (path, data, options) => {
    const response = await httpRequest.patch(path, data, options);

    return response;
};

export const curuser = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};
export const DELETE = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;
