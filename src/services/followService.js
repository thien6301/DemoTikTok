import * as httpRequest from '~/utils/httpRequest';

export const getFollower = async (page) => {
    try {
        const res = await httpRequest.get('me/followings', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
