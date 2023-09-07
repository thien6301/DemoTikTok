import classNames from 'classnames/bind';
import styles from './ViewVideo.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ViewVideoItems from '~/components/Layout/components/ViewVideo/ViewVideoItems';

const cx = classNames.bind(styles);
function ViewVideo() {
    const [showComment, setShowComment] = useState([]);
    const { id } = useParams();
    console.log(id);

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

    useEffect(() => {
        fetchCmt();
    }, [id]);

    return (
        <div className={cx('wrapper')}>
            <ViewVideoItems data={showComment} />
        </div>
    );
}

export default ViewVideo;
