import * as httpRequest from '~/utils/httpRequest';

export const getSuggested = async (page, perPage) => {
    try {
        const res = await httpRequest.get('users/suggested', {
            params: {
                per_page: perPage,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
