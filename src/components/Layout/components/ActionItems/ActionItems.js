import classNames from 'classnames/bind';
import style from './ActionItems.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faCommentDots,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import Share from '~/components/Popper/Share/share';
import { ShareIcon } from '~/components/Icons';
import { useEffect } from 'react';
import { ActionLike } from '~/services/handleLike';

const cx = classNames.bind(style);

function ActionItems({ data }) {
    const id = data.id;

    const [like, setLike] = useState(data.likes_count);
    const [activeLike, setActiveLike] = useState(data.is_liked);
    const [activeFav, setActiveFav] = useState(false);

    const fetchApiLike = () => {
        fetch(`https://tiktok.fullstack.edu.vn/api/videos/${id}/like`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };

    // const fetchApi = async () => {
    //     const result = await ActionLike(id)
    //     console.log(result);
    // }

    const fetchApiUnlike = () => {
        fetch(`https://tiktok.fullstack.edu.vn/api/videos/${id}/unlike`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            });
    };

    const handleTym = () => {
        setLike(like + (activeLike ? -1 : +1));
        setActiveLike(!activeLike);
        if (!activeLike) {
            fetchApiLike();
        } else {
            fetchApiUnlike();
        }
    };

    const handleFavorite = () => {
        setActiveFav((current) => !current);
    };

    return (
        <div className={cx('action-item')}>
            <div className={cx('tym-action')} onClick={handleTym}>
                <span className={cx('spanIcon')}>
                    {activeLike ? (
                        <FontAwesomeIcon
                            className={cx('icon')}
                            icon={faHeart}
                            style={{ color: '#e2223f' }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className={cx('icon')}
                            icon={faHeart}
                        />
                    )}
                </span>
                <strong className={cx('like-count')}>{like}</strong>
            </div>
            <div className={cx('cmt-action')}>
                <span className={cx('spanIcon')}>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faCommentDots}
                    />
                </span>
                <strong className={cx('cmt-count')}>
                    {data.comments_count}
                </strong>
            </div>
            <div className={cx('favorites-action')} onClick={handleFavorite}>
                <span className={cx('spanIcon')}>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        style={activeFav ? { color: '#ecdb22' } : ''}
                        icon={faBookmark}
                    />
                </span>

                <strong className={cx('underfind-count')}>
                    {data.views_count}
                </strong>
            </div>

            <Share>
                <div className={cx('share-action')}>
                    <span className={cx('spanIcon')}>
                        <ShareIcon />
                    </span>
                    <strong className={cx('share-count')}>
                        {data.shares_count}
                    </strong>
                </div>
            </Share>
        </div>
    );
}

export default ActionItems;
