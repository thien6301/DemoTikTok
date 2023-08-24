import * as httpRequest from '~/utils/httpRequest';

export const logoutService = async () => {
    try {
        const res = await httpRequest.get('auth/logout', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res;
    } catch (error) {
        console.log('errorLogout: ', error.message);
    }
};
