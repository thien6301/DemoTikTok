import { createContext, useContext, useState } from 'react';

export const CommentContext = createContext();

export function UserVideo() {
    return useContext(CommentContext);
}
function CommentProvider({ children }) {
    const [isShow, setIsShow] = useState(false);
    const [currentLink, setCurrentLink] = useState();
    const [idVideoCurrent, setIdVideoCurrent] = useState();
    const [indexCurrent, setIndexCurrent] = useState();
    const [isWatch, setIsWatch] = useState(false);
    const [uuidVideo, setUiidVideo] = useState();
    const [positionVideo, setPositionVideo] = useState(null);
    const [listVideos, setListVideos] = useState();


    const body = document.body;

    const handleShowComment = () => {
        body.classList.add('hidden');
        setIsShow(true);
    };

    const handleHideComment = () => {
        body.classList.remove('hidden');
        setIsShow(false);
    };

    const handleSetLink = (link) => {
        setCurrentLink(link);
    };

    const handleShowWatchComment = () => {
        body.classList.add('hidden');
        setIsWatch(true);
    };

    const handleHideWatchComment = () => {
        body.classList.remove('hidden');
        setIsWatch(false);
    };

    const value = {
        handleShowComment,
        handleHideComment,
        handleSetLink,
        setIdVideoCurrent,
        setIndexCurrent,
        handleShowWatchComment,
        handleHideWatchComment,
        setUiidVideo,
        setPositionVideo,
        setListVideos,
        idVideoCurrent,
        indexCurrent,
        currentLink,
        isShow,
        isWatch,
        uuidVideo,
        positionVideo,
        listVideos,
    };

    return (
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    );
}

export default CommentProvider;
