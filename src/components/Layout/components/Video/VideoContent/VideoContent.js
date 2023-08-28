import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faCheckCircle,
    faCommentDots,
    faHeart,
    faMusic,
    faShare,
} from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import { useRef, useState, useEffect } from 'react';
import { useElementOnScreen } from '../Video';
import {
    CopyLink,
    Embed,
    Send,
    SharetoFacebook,
    SharetoWatchsApp,
} from '~/components/Icons';
import Share from '~/components/Popper/Share/share';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function VideoContent({ data }) {
    const share_Menu = [
        {
            icon: <Embed />,
            title: 'Embed',
            to: '/embed',
        },

        {
            icon: <Send />,
            title: 'Send',
            to: '/send',
        },
        {
            icon: <SharetoFacebook />,
            title: 'Share to Facebook',
            to: '/coin',
        },
        {
            icon: <SharetoWatchsApp />,
            title: 'Share to WhatsApp',
            to: '/setting',
        },

        {
            icon: <CopyLink />,
            title: 'Copy Link',
            to: '/Copy',
        },

        // {
        //     icon: <BottomIcon />,
        //     to: '/Copy',
        // },
    ];

    const videoRef = useRef();
    const [playing, setPlaying] = useState();
    const [activeFav, setActiveFav] = useState(false);
    const [activeTym, setActiveTym] = useState(false);

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    };
    const isVisibile = useElementOnScreen(options, videoRef);
    const handlePlayVideo = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };
    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisibile]);

    const handleFavorite = () => {
        setActiveFav((current) => !current);
    };

    const handleTym = () => {
        setActiveTym((current) => !current);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('show-video')}>
                <div className={cx('video-title')}>
                    <img
                        className={cx('avatar-account')}
                        src={data.user.avatar}
                        alt="none"
                    />
                    <div className={cx('content-conainer')}>
                        <div className={cx('video-author')}>
                            <h3 className={cx('nick-name')}>
                                {data.user.nickname}
                            </h3>
                            {data.user.tick && (
                                <FontAwesomeIcon
                                    className={cx('check')}
                                    icon={faCheckCircle}
                                />
                            )}
                            <h4 className={cx('full-name')}>
                                {data.user.first_name +
                                    ' ' +
                                    data.user.last_name}
                            </h4>
                        </div>

                        <div className={cx('video-title')}>
                            {data.description}
                        </div>
                        <div className={cx('video-audio')}>
                            <FontAwesomeIcon icon={faMusic} />
                            <span className={cx('music')}>{data.music}</span>
                        </div>
                    </div>
                    {data.user.is_followed && (
                        <div className={cx('follow')}>
                            <Button up small>
                                Following
                            </Button>
                        </div>
                    )}
                    {!data.user.is_followed && (
                        <div className={cx('follow')}>
                            <Button outline small>
                                Follow
                            </Button>
                        </div>
                    )}
                </div>

                <div className={cx('video-main')}>
                    <div className={cx('video-content')}>
                        <video
                            id={data.id}
                            ref={videoRef}
                            className={cx('video')}
                            height="100%"
                            width="100%"
                            loop
                            // controls
                            preload="auto"
                            onClick={handlePlayVideo}
                        >
                            <source src={data.file_url} type="video/ogg" />
                        </video>
                    </div>

                    <div className={cx('action-item')}>
                        <div className={cx('tym-action')} onClick={handleTym}>
                            <span className={cx('spanIcon')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    icon={faHeart}
                                    style={
                                        activeTym ? { color: '#e2223f' } : ''
                                    }
                                />
                                {/* <TymIcon className = {cx('icon')}/> */}
                            </span>
                            <strong className={cx('like-count')}>
                                {data.likes_count}
                            </strong>
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
                        <div
                            className={cx('favorites-action')}
                            onClick={handleFavorite}
                        >
                            <span className={cx('spanIcon')}>
                                <FontAwesomeIcon
                                    className={cx('icon')}
                                    style={
                                        activeFav ? { color: '#ecdb22' } : ''
                                    }
                                    icon={faBookmark}
                                />
                            </span>

                            <strong className={cx('underfind-count')}>
                                {data.views_count}
                            </strong>
                        </div>

                        <Share items={share_Menu}>
                            <div className={cx('share-action')}>
                                <span className={cx('spanIcon')}>
                                    <FontAwesomeIcon
                                        icon={faShare}
                                        className={cx('icon')}
                                    />
                                </span>
                                <strong className={cx('share-count')}>
                                    {data.shares_count}
                                </strong>
                            </div>
                        </Share>
                    </div>
                </div>
            </div>

            {/* <div class="loading">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div> */}
        </div>
    );
}

export default VideoContent;
