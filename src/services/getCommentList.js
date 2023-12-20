import * as httpRequest from '~/utils/httpRequest';

export const getList = async (id) => {
    try {
        const res = await httpRequest.get(`videos/${id}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
