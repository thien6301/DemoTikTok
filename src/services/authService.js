import * as httpRequest from '~/utils/httpRequest';
const path = 'auth/';

export const register = async (registerData = {}) => {
    const response = await httpRequest.post(path + 'register', registerData);

    return response;
};
