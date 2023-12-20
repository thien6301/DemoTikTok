import * as httpRequest from '~/utils/httpRequest';

export const getCurrentVideo = async (id) => {
    try {
        const res = await httpRequest.get(`videos/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
