import classNames from 'classnames/bind';
import styles from './VideoModal.module.scss';
import Image from '~/components/Image/Image';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmileBeam, faMusic } from '@fortawesome/free-solid-svg-icons';
import {
    DownIcon,
    Embed,
    MoreIcon,
    MuteIcon,
    PauseIcon,
    ReportLargeIcon,
    SendtoFriend,
    ShareIconMini,
    SharetoFacebook,
    SharetoWatchsApp,
    TrashCanIcon,
    TwitterIcon,
    UnMuteIcon,
    XIcon,
} from '~/components/Icons';
import { useContext, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { getCurrentVideo } from '~/services/getCurrentVideo';

import Comment from './Comment/Comment';
import { CommentContext } from '~/components/Contexts/VideoModalContext';
import VideoInteractive from './VideoInteractive/VideoInteractive';
import * as videoService from '~/services/videoService';

import { Link } from 'react-router-dom';
import { getList } from '~/services/getCommentList';
import { NotifyContextKey } from '~/components/Contexts/NotifyContext';
import { PostCommentService } from '~/services/PostCommentService';
import { LoginContext } from '~/components/Contexts/LoginModalContext';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { DeleteVideoService } from '~/services/DeleteVideo';

const INIT_PAGE = 1;

const cx = classNames.bind(styles);

function VideoModal({ idVideo }) {
    const videoRef = useRef();
    const rangeRef = useRef();
    const thumbRef = useRef();

    const ContextComment = useContext(CommentContext);
    const ContextLogin = useContext(LoginContext);
    const indexCurrent = ContextComment.indexCurrent + 1;
    const [indexVideo, setIndexVideo] = useState(indexCurrent);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);
    const [progressBarWidth, setProgressBarWidth] = useState(0);

    const [duration, setDuration] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isVolume, setIsVolume] = useState(100);
    const [muteVideo, setMuteVideo] = useState(false);

    const [showVideo, setShowVideo] = useState([]);
    const [listComment, setListComment] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);
    const [listVideos, setListVideos] = useState([]);
    const [curUser, setCurUser] = useState([]);
    const [isId, setIsId] = useState(idVideo);
    const [isPressDeleteVideo, setIsPressDeleteVideo] = useState(false);

    //post comment

    const showNotify = useContext(NotifyContextKey);

    const [newComment, setNewComment] = useState('');
    const [activeComment, setActiveComment] = useState(false);

    const fetchApiPostComment = async () => {
        const result = await PostCommentService(idVideo, newComment);
        console.log('postComment: ', result);
        const result1 = await getList(idVideo);

        setListComment(result1);
        setNewComment('');
    };
    const handleSubmit = () => {
        fetchApiPostComment();
        showNotify('Comment posted');
        setActiveComment(false);
    };
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();

            fetchApiPostComment();
        }
    };
    const handleChange = (e) => {
        setActiveComment(true);
        if (e.target.value === '') {
            setActiveComment(false);
        }
        setNewComment(e.target.value);
    };

    //comment
    const fetchApiComment = async () => {
        const result = await getList(isId);
        setListComment(result);
    };
    // list comment
    useEffect(() => {
        fetchApiComment();
        setIsId(listVideos[indexVideo]?.id);
    }, [indexVideo]);

    const fetchApiVideo = async () => {
        const result = await getCurrentVideo(isId);
        setShowVideo(result);
        setCurUser(result.user);
    };
    useEffect(() => {
        fetchApiVideo();
    }, []);

    // const fetchApiNextVideo = async () => {
    //     const result = await getCurrentVideo(listVideos[indexVideo]?.id);
    //     setShowVideo(result);
    //     setCurUser(result.user);
    // };

    useEffect(() => {
        const rangeWidth = rangeRef.current.getBoundingClientRect().width;
        const thumbWidth = thumbRef.current.getBoundingClientRect().width;
        const centerThumb = (thumbWidth / 100) * percentage * -1;
        const centerProgressBar =
            thumbWidth +
            (rangeWidth / 100) * percentage -
            (thumbWidth / 100) * percentage;
        setPosition(percentage);
        setMarginLeft(centerThumb);
        setProgressBarWidth(centerProgressBar);
    }, [percentage]);

    // next page
    useEffect(() => {
        videoService
            .getVideo(page)
            .then((data) => {
                setListVideos((prev) => [...prev, ...data]);
            })
            .catch((error) => console.log(error));
    }, [page]);
    useEffect(() => {
        if (indexVideo == listVideos.length) {
            setPage((currentPage) => currentPage + 1);
        }
    });

    // set time video
    const onChange = (e) => {
        const audio = videoRef.current;
        audio.currentTime = (audio.duration / 100) * e.target.value;
        setPercentage(e.target.value);
    };

    const getCurrDuration = (e) => {
        const percent = (
            (e.currentTarget.currentTime / e.currentTarget.duration) *
            100
        ).toFixed(2);
        const time = e.currentTarget.currentTime;

        setPercentage(+percent);
        setCurrentTime(time.toFixed(2));
    };

    function secondsToHms(seconds) {
        if (!seconds) return '00:00';

        let duration = seconds;
        let hours = duration / 3600;
        duration = duration % 3600;

        let min = parseInt(duration / 60);
        duration = duration % 60;

        let sec = parseInt(duration);

        if (sec < 10) {
            sec = `0${sec}`;
        }
        if (min < 10) {
            min = `0${min}`;
        }

        if (parseInt(hours, 10) > 0) {
            return `${parseInt(hours, 10)}h ${min}:${sec}`;
        } else if (min === 0) {
            return `00:${sec}`;
        } else {
            return `${min}:${sec}`;
        }
    }

    const handlePauseVideo = () => {
        const video = videoRef.current;
        if (isPlaying) {
            setIsPlaying(false);
            video.play();
        }
        if (!isPlaying) {
            video.pause();
            setIsPlaying(true);
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

    /// ActionVideo
    // const handleNextVideo = () => {
    //     setIndexVideo((prev) => prev + 1);
    //     if (indexVideo) {
    //         fetchApiNextVideo();
    //     }
    // };
    // const handlePrevVideo = () => {
    //     if (indexVideo && indexVideo >= 0) {
    //         setIndexVideo((prev) => prev - 1);
    //         fetchApiNextVideo();
    //     }
    // };
    const handleDeleteVideo = async () => {
        const responseData = await DeleteVideoService(idVideo);

        if (responseData?.message) {
            showNotify('Video cannot be deleted. Please try again later!');
        } else {
            showNotify('Deleted');

            setIsPressDeleteVideo(true);
            window.location.reload();
        }
    };
    const renderDeleteVideo = (attrs) => (
        <div className={cx('menu-list')} {...attrs}>
            <PopperWrapper classNames={cx('menu-popper')}>
                <span
                    className={cx('line-1')}
                    onClick={() => {
                        setIsPressDeleteVideo(true);
                    }}
                >
                    <span className={cx('trashIcon')}>
                        <TrashCanIcon />
                    </span>
                    Delete
                </span>
            </PopperWrapper>
        </div>
    );

    return (
        <div className={cx('wrapper')}>
            {isPressDeleteVideo && (
                <div className={cx('wrapper-delete')}>
                    <div className={cx('container-delete')}>
                        <div className={cx('title-delete')}>
                            <span>
                                Are you sure you want to delete this Video?
                            </span>
                        </div>
                        <div className={cx('button-wrapper-delete')}>
                            <Button
                                up
                                className={cx('button-cancel')}
                                onClick={() => setIsPressDeleteVideo(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                outline
                                className={cx('button-delete')}
                                onClick={handleDeleteVideo}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('video-wrapper')}>
                <div className={cx('video-container')}>
                    <p
                        className={cx('thumb-video')}
                        style={{
                            backgroundImage: `url(${showVideo.thumb_url})`,
                        }}
                    ></p>
                    <div className={cx('video')}>
                        <video
                            loop
                            autoPlay
                            key={showVideo.id}
                            muted={muteVideo}
                            volume={isVolume}
                            ref={videoRef}
                            onClick={handlePauseVideo}
                            src={showVideo.file_url}
                            style={{ width: '100%', height: '100%' }}
                            onTimeUpdate={getCurrDuration}
                            onLoadedData={(e) => {
                                setDuration(
                                    e.currentTarget.duration.toFixed(2),
                                );
                            }}
                        ></video>
                    </div>
                    <div
                        className={cx('remove-video', 'subVideo')}
                        onClick={ContextComment.handleHideComment}
                    >
                        <XIcon />
                    </div>
                    <div className={cx('report-video', 'subVideo')}>
                        <ReportLargeIcon />
                        <p style={{ marginLeft: '5px' }}>Report</p>
                    </div>
                    <div
                        className={cx('back-video', 'subVideo')}
                        // onClick={handlePrevVideo}
                    >
                        <DownIcon />
                    </div>
                    <div
                        className={cx('next-video', 'subVideo')}
                        // onClick={handleNextVideo}
                    >
                        <DownIcon />
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
                                className={cx('mute-video', 'subVideo')}
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
                    <div className={cx('progress-container')}>
                        <div className={cx('slider-container')}>
                            <div
                                className={cx('progress-bar-cover')}
                                style={{
                                    width: `${progressBarWidth}px`,
                                }}
                            ></div>
                            <div
                                className={cx('thumb')}
                                ref={thumbRef}
                                style={{
                                    left: `${position}%`,
                                    marginLeft: `${marginLeft}px`,
                                }}
                            ></div>
                            <input
                                type="range"
                                value={position}
                                ref={rangeRef}
                                step="0.01"
                                className={cx('range')}
                                onChange={onChange}
                            />
                        </div>
                        <div className={cx('timer', 'time-start')}>
                            {secondsToHms(currentTime)}/
                        </div>
                        <div className={cx('timer')}>
                            {secondsToHms(duration)}
                        </div>
                    </div>
                    {isPlaying && (
                        <div className={cx('pause-video')}>
                            <PauseIcon />
                        </div>
                    )}
                </div>
            </div>
        

            {/* mm */}

            <div className={cx('content')}>
                <div className={cx('content-wrapper')}>
                    <div className={cx('description-container')}>
                        <div className={cx('info-container')}>
                            <Link
                                to={`/@${curUser.nickname}`}
                                onClick={ContextComment.handleHideComment}
                            >
                                <Image
                                    src={curUser.avatar}
                                    className={cx('avatar')}
                                />
                            </Link>
                            <Link
                                to={`/@${curUser.nickname}`}
                                className={cx('name')}
                                onClick={ContextComment.handleHideComment}
                            >
                                <h2 className={cx('nickname')}>
                                    {curUser.nickname}
                                </h2>
                                <h4 className={cx('fullname')}>
                                    {curUser.first_name +
                                        ' ' +
                                        curUser.last_name}
                                    <span style={{ margin: '0px 4px ' }}>
                                        .
                                    </span>
                                    <span>{showVideo.published_at}</span>
                                </h4>
                            </Link>
                            {ContextLogin.data.nickname == curUser.nickname ? (
                                <Tippy
                                    delay={[0, 300]}
                                    offset={[10, -20]}
                                    interactive
                                    placement="bottom-end"
                                    animation={false}
                                    render={() => renderDeleteVideo(curUser)}
                                >
                                    <span className={cx('more-button')}>
                                        <MoreIcon />
                                    </span>
                                </Tippy>
                            ) : (
                                <div className={cx('follow')}>
                                    {curUser.is_followed ? (
                                        <Button up>Following</Button>
                                    ) : (
                                        <Button primary>Follow</Button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={cx('main-container')}>
                            <div className={cx('title-content')}>
                                <h1 className={cx('title')}>
                                    {showVideo.description}
                                </h1>
                            </div>

                            <div className={cx('brower-music')}>
                                <span className={cx('icon-music')}>
                                    <FontAwesomeIcon
                                        icon={faMusic}
                                        className={cx('icon')}
                                    />
                                </span>
                                <p className={cx('title-music')}>
                                    {showVideo.music}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('main-content')}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <VideoInteractive data={showVideo} />
                            <div className={cx('share-list')}>
                                <div className={cx('share-item')}>
                                    <span className={cx('icon')}>
                                        <Embed />
                                    </span>
                                </div>
                                <div className={cx('share-item')}>
                                    <span className={cx('icon')}>
                                        <SendtoFriend />
                                    </span>
                                </div>
                                <div className={cx('share-item')}>
                                    <span className={cx('icon')}>
                                        <SharetoFacebook />
                                    </span>
                                </div>
                                <div className={cx('share-item')}>
                                    <span className={cx('icon')}>
                                        <SharetoWatchsApp />
                                    </span>
                                </div>
                                <div className={cx('share-item')}>
                                    <span className={cx('icon')}>
                                        <TwitterIcon />
                                    </span>
                                </div>
                                <div className={cx('share-item')}>
                                    <span className={cx('icon')}>
                                        <ShareIconMini />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('copy-link')}>
                            <p className={cx('link')}>{window.location.href}</p>
                            <button className={cx('copy-btn')}>
                                Copy link
                            </button>
                        </div>
                    </div>
                    <div className={cx('tab-menu')}>
                        <div className={cx('tab-container')}>
                            <div className={cx('cmt-tab')}>Commnents</div>
                        </div>
                        <div className={cx('tab-container')}>
                            <div className={cx('creator-tab')}>
                                Creator Videos
                            </div>
                        </div>
                    </div>
                    <Comment
                        idVideo={idVideo}
                        listVideos={listVideos}
                        indexVideo={indexVideo}
                        commentState={[listComment, setListComment]}
                    />
                </div>

                {/* footer */}
                <div className={cx('footer')}>
                    <form className={cx('footer-container')}>
                        <div className={cx('creat-cmt')}>
                            <input
                                className={cx('text-cmt')}
                                placeholder="Add comment..."
                                style={{ height: '18px' }}
                                value={newComment}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                            <div className={cx('emojis')}>
                                <FontAwesomeIcon
                                    icon={faFaceSmileBeam}
                                    className={cx('icon')}
                                />
                            </div>
                        </div>
                        <div
                            className={cx(
                                'post-cmt',
                                activeComment ? 'active-cmt' : '',
                            )}
                            onClick={handleSubmit}
                        >
                            Post
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VideoModal;
