import classNames from 'classnames/bind';
import styles from './VideoInteractive.module.scss';
import { useState } from 'react';
import { ActionLike, ActionUnLike } from '~/services/PostHandleVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import { CmtIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function VideoInteractive({ data, idVideo }) {
    return (
        <div className={cx('count-list')}>
            <div className={cx('tym')}>
                <div
                    className={cx('spanIcon')}
                    // onClick={() => handleLikeStateChange(!isLiked)}
                >
                    {data.is_liked ? (
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={cx('icon')}
                            style={{ color: 'red' }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={cx('icon')}
                        />
                    )}
                </div>
                <strong className={cx('count')}>{data.likes_count}</strong>
            </div>
            <div className={cx('cmt')}>
                <div className={cx('spanIcon')}>
                    <CmtIcon />
                </div>
                <strong className={cx('count')}>{data.comments_count}</strong>
            </div>
            <div className={cx('favorite')}>
                <div className={cx('spanIcon')}>
                    <FontAwesomeIcon icon={faBookmark} />
                </div>
                <strong className={cx('count')}>1</strong>
            </div>
        </div>
    );
}

export default VideoInteractive;
