// import * as httpRequest from '~/utils/httpRequest';
// const path = 'auth/';

// export const register = async (registerData = {}) => {
//     try {
//         const res = await httpRequest.post(path + 'register', registerData);
//         return res
//     },
//     catch {
//         console.log("ds");
//     }

//     return response;
// };
import * as httpRequest from '~/utils/httpRequest';

const path = 'auth/';

export const register = async (registerData = {}) => {
    try {
        const res = await httpRequest.post(path + 'register', registerData);
        console.log('successRegister: ', res);
        return res;
    } catch (error) {
        console.log('errorRegister: ', error);
    }
};
