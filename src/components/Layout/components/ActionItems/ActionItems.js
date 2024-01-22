import classNames from 'classnames/bind';
import style from './ActionItems.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faCommentDots,
    faHeart,
} from '@fortawesome/free-solid-svg-icons';
import Share from '~/components/Popper/Share/share';
import { ShareIcon } from '~/components/Icons';
import { ActionLike, ActionUnLike } from '~/services/PostHandleVideo';
// import { ActionLike } from '~/services/handleLike';

const cx = classNames.bind(style);

function ActionItems({ data }) {
    const id = data.id;

    const [like, setLike] = useState(data.likes_count);
    const [isLiked, setIsLiked] = useState(data.is_liked);
    const [activeFav, setActiveFav] = useState(false);

    const handleLikeStateChange = async (newState) => {
        if (newState) {
            const isSuccess = await ActionLike(id);
            if (isSuccess) {
                setLike((prev) => prev + 1);
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        } else {
            const isSuccess = await ActionUnLike(id);
            if (!isSuccess) {
                setIsLiked(true);
            } else {
                setLike((prev) => prev - 1);
                setIsLiked(false);
            }
        }
    };
    return (
        <div className={cx('action-item')}>
            <div
                className={cx('tym-action')}
                onClick={() => handleLikeStateChange(!isLiked)}
            >
                <span className={cx('spanIcon')}>
                    {isLiked ? (
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
            <div className={cx('favorites-action')} >
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
