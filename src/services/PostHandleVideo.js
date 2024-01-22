import * as httpRequest from '~/utils';

export const ActionLike = async (id) => {
    try {
        const res = await httpRequest.post(
            `videos/${id}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        return res;
    } catch (error) {
        console.log('likePost: ', error);
    }
};

export const ActionUnLike = async (id) => {
    try {
        const res = await httpRequest.post(
            `videos/${id}/unlike`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        return res;
    } catch (error) {
        console.log('errorLikePost: ', error);
    }
};
