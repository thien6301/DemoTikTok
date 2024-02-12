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
import { ActionLike, ActionUnLike } from '~/services/PostHandleVideo';

const cx = classNames.bind(style);

function ActionItems({ item, handleOpenModal }) {
    const id = item.id;

    const [activeFav, setActiveFav] = useState(false);

    const [like, setLike] = useState(item.likes_count);
    const [isLiked, setIsLiked] = useState(item.is_liked);

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
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faHeart}
                        style={isLiked ? { color: 'red' } : ''}
                    />
                </span>
                <strong className={cx('like-count')}>{like}</strong>
            </div>
            <div className={cx('cmt-action')} onClick={handleOpenModal}>
                <span className={cx('spanIcon')}>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        icon={faCommentDots}
                    />
                </span>
                <strong className={cx('cmt-count')}>
                    {item.comments_count}
                </strong>
            </div>
            <div className={cx('favorites-action')}>
                <span className={cx('spanIcon')}>
                    <FontAwesomeIcon
                        className={cx('icon')}
                        style={activeFav ? { color: '#ecdb22' } : ''}
                        icon={faBookmark}
                    />
                </span>

                <strong className={cx('underfind-count')}>
                    {item.views_count}
                </strong>
            </div>

            <Share>
                <div className={cx('share-action')}>
                    <span className={cx('spanIcon')}>
                        <ShareIcon />
                    </span>
                    <strong className={cx('share-count')}>
                        {item.shares_count}
                    </strong>
                </div>
            </Share>
        </div>
    );
}

export default ActionItems;
