import * as httpRequest from '~/utils/httpRequest';

export const getVideo = async (page, type = 'for-you' ) => {
    try {
        const res = await httpRequest.get('videos', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                page,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
