import classNames from 'classnames/bind';
import styles from './ViewVideoItems.module.scss';
import Image from '~/components/Image/Image';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faHeart,
    faMusic,
} from '@fortawesome/free-solid-svg-icons';
import {
    CmtIcon,
    DownIcon,
    Embed,
    MuteIcon,
    PauseIcon,
    ReportIcon,
    SendtoFriend,
    ShareIconMini,
    SharetoFacebook,
    SharetoWatchsApp,
    TwitterIcon,
    UnMuteIcon,
    XIcon,
} from '~/components/Icons';
import VideoCmtItems from './VideoCmtItems';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import { post } from '~/utils/httpRequest';
import { log } from 'util';

const cx = classNames.bind(styles);

function ViewVideoItems({ data, curVideo, curUser }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const [position, setPosition] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);
    const [progressBarWidth, setProgressBarWidth] = useState(0);

    const [duration, setDuration] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isVolume, setIsVolume] = useState(100);
    const [muteVideo, setMuteVideo] = useState(false);

    const [comments, setComments] = useState([]);
    const history = useNavigate();

    const videoRef = useRef();
    const rangeRef = useRef();
    const thumbRef = useRef();

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
    const makeComment = (comments) => {
        fetch(
            `https://tiktok.fullstack.edu.vn/api/videos/${curVideo.id}/comments`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(comments),
            },
        )
            .then((res) => res.json())
            .then((result) => {});
    };

    const handlePostComment = (e) => {
        e.preventDefault();
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
            <div className={cx('video-wrapper')}>
                <div className={cx('video-container')}>
                    <p
                        className={cx('thumb-video')}
                        style={{
                            backgroundImage: `url(${curVideo.thumb_url})`,
                        }}
                    ></p>
                    <div className={cx('video')}>
                        <video
                            loop
                            autoPlay
                            key={curVideo.id}
                            muted={muteVideo}
                            volume={isVolume}
                            ref={videoRef}
                            onClick={handlePauseVideo}
                            src={curVideo.file_url}
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
                        onClick={() => history(-1)}
                    >
                        <XIcon />
                    </div>
                    <div className={cx('report-video', 'subVideo')}>
                        <ReportIcon />
                        <p style={{ marginLeft: '5px' }}>Report</p>
                    </div>
                    <div className={cx('back-video', 'subVideo')}>
                        <DownIcon />
                    </div>
                    <div className={cx('next-video', 'subVideo')}>
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
            <div className={cx('content')}>
                <div className={cx('description-container')}>
                    <div className={cx('info-container')}>
                        <Image src={curUser.avatar} className={cx('avatar')} />
                        <div className={cx('name')}>
                            <h2 className={cx('nickname')}>
                                {curUser.nickname}
                            </h2>
                            <h4 className={cx('fullname')}>
                                {curUser.first_name + ' ' + curUser.last_name}
                                <span style={{ margin: '0px 4px ' }}>.</span>
                                <span>{curVideo.published_at}</span>
                            </h4>
                        </div>
                        <div className={cx('follow')}>
                            {curUser.is_followed ? (
                                <Button up>Following</Button>
                            ) : (
                                <Button primary>Follow</Button>
                            )}
                        </div>
                    </div>
                    <div className={cx('main-container')}>
                        <div className={cx('title-content')}>
                            <h1 className={cx('title')}>
                                {curVideo.description}
                            </h1>

                            {/* <span className={cx('hastag')}>#DQami</span> */}
                        </div>

                        <div className={cx('brower-music')}>
                            <span className={cx('icon-music')}>
                                <FontAwesomeIcon
                                    icon={faMusic}
                                    className={cx('icon')}
                                />
                            </span>
                            <p className={cx('title-music')}>
                                {curVideo.music}
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
                        <div className={cx('count-list')}>
                            <div className={cx('tym')}>
                                <div className={cx('spanIcon')}>
                                    <FontAwesomeIcon
                                        icon={faHeart}
                                        className={cx('icon')}
                                    />
                                </div>
                                <strong className={cx('count')}>
                                    {curVideo.likes_count}
                                </strong>
                            </div>
                            <div className={cx('cmt')}>
                                <div className={cx('spanIcon')}>
                                    <CmtIcon />
                                </div>
                                <strong className={cx('count')}>
                                    {curVideo.comments_count}
                                </strong>
                            </div>
                            <div className={cx('favorite')}>
                                <div className={cx('spanIcon')}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                                <strong className={cx('count')}>1</strong>
                            </div>
                        </div>
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
                        <p className={cx('link')}>
                            http://localhost:3000/video
                        </p>
                        <button className={cx('copy-btn')}>Copy link</button>
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
                </div>
                <div className={cx('cmt-wrapper')}>
                    <div>
                        {data.map((account) => (
                            <VideoCmtItems key={account.id} result={account} />
                        ))}
                    </div>
                </div>
                <div className={cx('footer')}>
                    <form className={cx('footer-container')}>
                        <div className={cx('creat-cmt')}>
                            <textarea
                                className={cx('text-cmt')}
                                rows={1}
                                placeholder="Add comment..."
                                style={{ height: '18px' }}
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                spellCheck={false}
                            ></textarea>
                            <div className={cx('emojis')}>
                                <FontAwesomeIcon
                                    icon={faFaceSmile}
                                    className={cx('icon')}
                                />
                            </div>
                        </div>
                        <div
                            className={cx('post-cmt')}
                            onClick={handlePostComment}
                        >
                            Post
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewVideoItems;
