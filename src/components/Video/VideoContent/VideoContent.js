import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faMusic } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

// import * as LikeService from '~/services/LikeService';

import { useRef, useState, useEffect, useContext } from 'react';
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
import ActionItems from '../ActionItems/ActionItems';
import { ActionFollow, ActionUnFollow } from '~/services/PostHandleVideo';
import { CommentContext } from '~/components/Contexts/VideoModalContext';
import Image from '~/components/Image';
import { LoginContext } from '~/components/Contexts/LoginModalContext';
import { ModalContext } from '~/components/Contexts/ModalProvider';

const cx = classNames.bind(styles);
function VideoContent({ children, idVideo, uuidVideo, item, index }) {
    const videoRef = useRef();

    const contextComment = useContext(CommentContext);
    const ContextLogin = useContext(LoginContext);
    const contextModal = useContext(ModalContext);
    const [isFollowed, setIsFollowed] = useState(item.user?.is_followed);
    const [isplaying, setIsPlaying] = useState(false);
    const [isVolume, setIsVolume] = useState(50);
    const [muteVideo, setMuteVideo] = useState(false);

    const handleVideo = () => {
        if (isplaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePauseVideo = () => {
        videoRef.current.pause();
        setIsPlaying(false);
    };

    // play video inview
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
    };
    const isVisibile = useElementOnScreen(options, videoRef);
    useEffect(() => {
        if (isVisibile) {
            if (!isplaying) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        } else {
            if (isplaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [isVisibile]);

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
            const isSuccess = await ActionFollow(item.user.id);
            setIsFollowed(true);
            console.log(isSuccess);
        } else if (isFollowed) {
            const isSuccess = await ActionUnFollow(item.user.id);
            setIsFollowed(false);
            console.log(isSuccess);
        }
    };
    const handleViewVideo = () => {
        if (ContextLogin.data) {
            handlePauseVideo();

            contextComment.handleShowComment();
            contextComment.handleSetLink(children);
            contextComment.setIdVideoCurrent(idVideo);
            contextComment.setIndexCurrent(index);
            contextComment.setUiidVideo(uuidVideo);
        } else {
            contextModal.handleShowModal();
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('show-video')}>
                <div className={cx('video-title')}>
                    <Link to={`/@${item.user.nickname}`}>
                        <Image
                            className={cx('avatar-account')}
                            src={item.user.avatar}
                            alt="none"
                        />
                    </Link>
                    <div className={cx('content-conainer')}>
                        <Link
                            to={`/@${item.user.nickname}`}
                            className={cx('video-author')}
                        >
                            <h3 className={cx('nick-name')}>
                                {item.user.nickname}
                            </h3>
                            {item.user.tick && (
                                <FontAwesomeIcon
                                    className={cx('check')}
                                    icon={faCheckCircle}
                                />
                            )}
                            <h4 className={cx('full-name')}>
                                {item.user.first_name +
                                    ' ' +
                                    item.user.last_name}
                            </h4>
                        </Link>

                        <div className={cx('video-title')}>
                            {item.description}
                        </div>
                        <div className={cx('video-audio')}>
                            <FontAwesomeIcon icon={faMusic} />
                            <span className={cx('music')}>{item.music}</span>
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
                        <div
                            className={cx('video-content')}
                            onClick={() => {
                                handleViewVideo();
                            }}
                        >
                            <video
                                id={idVideo}
                                ref={videoRef}
                                className={cx('video')}
                                height="100%"
                                width="100%"
                                muted={muteVideo}
                                loop
                                preload="auto"
                            >
                                <source src={item.file_url} type="video/ogg" />
                            </video>
                        </div>

                        <div
                            className={cx('pause-control', 'video-sub')}
                            onClick={handleVideo}
                        >
                            {isplaying ? <PlayIcon /> : <PauseIconMini />}
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
                    <ActionItems
                        item={item}
                        handleOpenModal={handleViewVideo}
                    />
                </div>
            </div>

            {/* loading */}
        </div>
    );
}

export default VideoContent;
