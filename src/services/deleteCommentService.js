import * as httpRequest from '~/utils/httpRequest';


export const deleteCommentService = async (idComment) => {
    try {
        const res = await httpRequest.DELETE(`comments/${idComment}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log('successDeleteComment: ', res);
        return res;
    } catch (error) {
        console.log('errorDeleteComment: ', error);
    }
};
