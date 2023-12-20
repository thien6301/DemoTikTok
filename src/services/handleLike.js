import * as httpRequest from '~/utils/httpRequest';

export const ActionLike = async (id) => {
    try {
        const res = await httpRequest.post(`videos/${id}/like`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const unlike = async (id) => {
    try {
        const res = await httpRequest.post(`videos/${id}/unlike`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
