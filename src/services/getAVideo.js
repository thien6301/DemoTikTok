import * as httpRequest from '~/utils/httpRequest';

export const getAVideo = (uuidVideo) => {
    try {
        const res = httpRequest.get(`videos/${uuidVideo}`, {});
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
