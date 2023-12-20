import * as httpRequest from '~/utils';

export const PostCommentService = async (id, newComment) => {
    try {
        const res = await httpRequest.post(
            `videos/${id}/comments`,
            { comment: newComment },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        return res;
    } catch (error) {
        console.log('errorCreatCmt: ', error);
    }
};
