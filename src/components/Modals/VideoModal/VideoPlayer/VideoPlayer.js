import classNames from 'classnames/bind';
import styles from './VideoPlayer.module.scss';
import { useEffect, useRef, useState } from 'react';
import { getCurrentVideo } from '~/services/getCurrentVideo';
import {
    DownIcon,
    MuteIcon,
    PauseIcon,
    ReportLargeIcon,
    UnMuteIcon,
    XIcon,
} from '~/components/Icons';
import Tippy from '@tippyjs/react';

const cx = classNames.bind(styles);

function VideoPlayer() {
    const { id } = useParams();
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
    const [curUser, setCurUser] = useState([]);

    // console.log(isLiked);

    const history = useNavigate();

    const videoRef = useRef();
    const rangeRef = useRef();
    const thumbRef = useRef();

    useEffect(() => {
        const fetchApi = async () => {
            const result = await getCurrentVideo(id);
            setShowVideo(result);
            setCurUser(result.user);
            setLikesCount(result.likes_count);
        };
        fetchApi();
    }, []);

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

    return (
        <div className={cx('wrapper')}>
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
                        onClick={() => history(-1)}
                    >
                        <XIcon />
                    </div>
                    <div className={cx('report-video', 'subVideo')}>
                        <ReportLargeIcon />
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
        </div>
    );
}

export default VideoPlayer;
