import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

// import * as LikeService from '~/services/LikeService';

import { useRef, useState, useEffect } from 'react';
import { useElementOnScreen } from '../Video';
import { Link } from 'react-router-dom';
import {
    MuteIcon,
    PauseIconMini,
    PlayIcon,
    ReportMiniIcon,
    UnMuteIcon,
} from '~/components/Icons';
import Tippy from '@tippyjs/react/headless';
// import ActionItems from '../../ActionItems/ActionItems';
import ActionItems from '../ActionItems/ActionItems'
import { ActionFollow, ActionUnFollow } from '~/services/PostHandleVideo';

const cx = classNames.bind(styles);
function VideoContent({ data }) {
    const videoRef = useRef();

    const [isFollowed, setIsFollowed] = useState(data.user.is_followed);
    const [playing, setPlaying] = useState();
    const [isVolume, setIsVolume] = useState(50);
    const [muteVideo, setMuteVideo] = useState(false);

    // play video inview
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    };
    const isVisibile = useElementOnScreen(options, videoRef);
    const handleVideo = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };

    const handlePauseVideo = () => {
        const id = data.id;
        console.log(id);

        videoRef.current.pause();
        setPlaying(false);
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
    }, [isVisibile, playing]);

    useEffect(() => {
        if (videoRef) {
            videoRef.current.volume = isVolume / 100;
        }
    }, [isVolume, videoRef]);

    const handleMuteVideo = () => {
        setMuteVideo((prev) => !prev);
    };

    const handleFollowStateChange = async () => {
        if (!isFollowed) {
            const isSuccess = await ActionFollow(data.id);
            setIsFollowed(true);
            console.log(isSuccess);
        } else if (isFollowed) {
            const isSuccess = await ActionUnFollow(data.id);
            setIsFollowed(false);
            console.log(isSuccess);
        }
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
                    <div
                        className={cx('follow')}
                        onClick={handleFollowStateChange}
                    >
                        {isFollowed ? (
                            <Button up>Following</Button>
                        ) : (
                            <Button outline>Follow</Button>
                        )}
                    </div>
                </div>

                <div className={cx('video-main')}>
                    <div className={cx('video-cover')}>
                        <Link
                            to={`/video/${data.id}`}
                            className={cx('video-content')}
                            onClick={handlePauseVideo}
                        >
                            <video
                                id={data.id}
                                ref={videoRef}
                                className={cx('video')}
                                height="100%"
                                width="100%"
                                muted={muteVideo}
                                loop
                                preload="auto"
                            >
                                <source src={data.file_url} type="video/ogg" />
                            </video>
                        </Link>

                        <div
                            className={cx('pause-control', 'video-sub')}
                            onClick={handleVideo}
                        >
                            {playing ? <PlayIcon /> : <PauseIconMini />}
                        </div>

                        <div className={cx('report-control', 'video-sub')}>
                            <span>
                                {' '}
                                <ReportMiniIcon />
                            </span>
                            <p style={{ marginLeft: '5px' }}>Report</p>
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
                    </div>
                    <ActionItems data={data} />
                </div>
            </div>

            {/* loading */}
        </div>
    );
}

export default VideoContent;
