import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async (page, perPage) => {
    try {
        const res = await httpRequest.get('me/following', {
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
