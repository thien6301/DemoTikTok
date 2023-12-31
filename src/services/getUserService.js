import * as httpRequest from '~/utils/httpRequest';

export const getUser = async (nickname) => {
    try {
        const res = await httpRequest.get(`users/${nickname}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
