import classNames from "classnames/bind";
import styles from './VideoInteractive.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { CmtIcon } from "~/components/Icons";
import { useState } from "react";
import { ActionLike, ActionUnLike } from "~/services/PostHandleVideo";

const cx = classNames.bind(styles)

function VideoInteractive() {

    const [likesCount, setLikesCount] = useState();
    const [isLiked, setIsLiked] = useState();


    const handleLikeStateChange = async () => {
        if (!isLiked) {
            const isSuccess = await ActionLike(id);
            if (isSuccess) {
                setLikesCount((prev) => prev + 1);
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        } else {
            const isSuccess = await ActionUnLike(id);
            if (!isSuccess) {
                setIsLiked(true);
            } else {
                setLikesCount((prev) => prev - 1);
                setIsLiked(false);
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('count-list')}>
                <div className={cx('tym')}>
                    <div
                        className={cx('spanIcon')}
                        onClick={handleLikeStateChange}
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            className={cx('icon')}
                            style={isLiked ? { color: 'red' } : ''}
                        />
                    </div>
                    <strong className={cx('count')}>{likesCount}</strong>
                </div>
                <div className={cx('cmt')}>
                    <div className={cx('spanIcon')}>
                        <CmtIcon />
                    </div>
                    <strong className={cx('count')}>
                        {showVideo.comments_count}
                    </strong>
                </div>
                <div className={cx('favorite')}>
                    <div className={cx('spanIcon')}>
                        <FontAwesomeIcon icon={faBookmark} />
                    </div>
                    <strong className={cx('count')}>1</strong>
                </div>
            </div>
        </div>
    );
}

export default VideoInteractive;
