import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faCheckCircle,
    faCommentDots,
    faHeart,
    faMusic,
} from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

// import * as LikeService from '~/services/LikeService';

import { useRef, useState, useEffect } from 'react';
import { useElementOnScreen } from '../Video';
import Share from '~/components/Popper/Share/share';
import { Link } from 'react-router-dom';
import {
    MuteIcon,
    PauseIconMini,
    PlayIcon,
    ReportIcon,
    ShareIcon,
    UnMuteIcon,
} from '~/components/Icons';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);
function VideoContent({ data }) {
    const videoRef = useRef();

    const [playing, setPlaying] = useState();
    const [activeFav, setActiveFav] = useState(false);
    const [isVolume, setIsVolume] = useState(50);
    const [muteVideo, setMuteVideo] = useState(false);
    const [like, setLike] = useState(data.likes_count);
    const [activeLike, setActiveLike] = useState(data.is_liked);
    const id = data.id;

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

    // play video inview
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
        
        setLike(like + (activeLike ? -1 : +1));
        setActiveLike(!activeLike);
        if (!activeLike) {
            fetchApiLike();
        } else {
            fetchApiUnlike();
        }
    };

    const handlePauseVideo = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };

    useEffect(() => {
        if (videoRef) {
            videoRef.current.volume = isVolume / 100;
        }
    }, [isVolume, videoRef]);

    const handleMuteVideo = () => {
        setMuteVideo((prev) => !prev);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('show-video')}>
                <div className={cx('video-title')}>
                    <Link to={`/@${data.user.nickname}`}>
                        <img
                            className={cx('avatar-account')}
                            src={data.user.avatar}
                            alt="none"
                        />
                    </Link>
                    <div className={cx('content-conainer')}>
                        <Link
                            to={`/@${data.user.nickname}`}
                            className={cx('video-author')}
                        >
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
                        </Link>

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
                            <Button primary>Following</Button>
                        </div>
                    )}
                    {!data.user.is_followed && (
                        <div className={cx('follow')}>
                            <Button outline>Follow</Button>
                        </div>
                    )}
                </div>

                <div className={cx('video-main')}>
                    <div className={cx('video-cover')}>
                        <Link
                            to={`/video/${data.id}`}
                            className={cx('video-content')}
                        >
                            <video
                                id={data.id}
                                ref={videoRef}
                                className={cx('video')}
                                height="100%"
                                width="100%"
                                loop
                                preload="auto"
                                onClick={handlePlayVideo}
                            >
                                <source src={data.file_url} type="video/ogg" />
                            </video>
                        </Link>
                        <div
                            className={cx('pause-control', 'video-sub')}
                            onClick={handlePauseVideo}
                        >
                            {playing ? <PlayIcon /> : <PauseIconMini />}
                        </div>
                        <div className={cx('video-volume')}>
                            <Tippy
                                interactive
                                offset={[-20, -6]}
                                placement="top"
                                delay={[0, 50]}
                                render={() => (
                                    <div className={cx('volume-control')}>
                                        <input
                                            value={isVolume}
                                            className={cx('range-volume')}
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            onChange={(e) =>
                                                setIsVolume(e.target.value)
                                            }
                                        />
                                    </div>
                                )}
                            >
                                <div
                                    className={cx('mute-video', 'video-sub')}
                                    onClick={handleMuteVideo}
                                >
                                    {muteVideo || isVolume < 0.1 ? (
                                        <MuteIcon />
                                    ) : (
                                        isVolume >= 0.1 && <UnMuteIcon />
                                    )}
                                </div>
                            </Tippy>
                        </div>
                        <div className={cx('report-control', 'video-sub')}>
                            <span>
                                {' '}
                                <ReportIcon />
                            </span>
                            <p style={{ marginLeft: '5px' }}>Report</p>
                        </div>
                    </div>

                    <div className={cx('action-item')}>
                        <div className={cx('tym-action')} onClick={handleTym}>
                            <span className={cx('spanIcon')}>
                                { activeLike ? (
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
                </div>
            </div>

            {/* loading */}
        </div>
    );
}

export default VideoContent;
