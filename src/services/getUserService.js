import * as httpRequest from '~/utils/httpRequest';

export const getUser = async () => {
    try {
        const res = await httpRequest.get('users');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
