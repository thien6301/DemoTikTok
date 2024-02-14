import * as httpRequest from '~/utils/httpRequest';

export const getCurrentUser = async () => {
    try {
        const res = await httpRequest.get('auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log('errorGetCurrent: ', error.message);
    }
};
