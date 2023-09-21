import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ViewVideoItems from '~/components/Layout/components/ViewVideo/ViewVideoItems';

const cx = classNames.bind(styles);
function ViewVideo() {
    const [showComment, setShowComment] = useState([]);
    const [showVideo, setShowVideo] = useState([]);
    const [showUser, setShowUser] = useState([]);
    const { id } = useParams();

    const fetchCmt = () => {
        fetch(`https://tiktok.fullstack.edu.vn/api/videos/${id}/comments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setShowComment(res.data);
            });
    };
    const fetchCurrentVideo = () => {
        fetch(`https://tiktok.fullstack.edu.vn/api/videos/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setShowVideo(res.data);
                setShowUser(res.data.user);
            });
    };

    useEffect(() => {
        fetchCurrentVideo();
        fetchCmt();
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <ViewVideoItems
                data={showComment}
                curVideo={showVideo}
                curUser={showUser}
            />
        </div>
    );
}

export default ViewVideo;
