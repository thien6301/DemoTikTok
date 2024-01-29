import classNames from 'classnames/bind';
import styles from './VideoModal.module.scss';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import VideoInteractive from './VideoInteractive/VideoInteractive';
import Comment from './Comment/Comment';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function VideoModal() {
    return (
        <div className={cx('wrapper')}>
            {/* VideoPlayer */}
            <div className={'video-container'}>
                <VideoPlayer />
            </div>
            {/* Content */}
            <div className={'content-container'}>
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
                                <span>{showVideo.published_at}</span>
                            </h4>
                        </div>
                        <div
                            className={cx('follow')}
                            onClick={handleFollowStateChange}
                        >
                            {isFollowed ? (
                                <Button up>Following</Button>
                            ) : (
                                <Button primary>Follow</Button>
                            )}
                        </div>
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


                        {/* cout */}  
                        <VideoInteractive />

                        {/* Share */}
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
                            {window.location.href}
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
                <Comment />
            </div>
        </div>
    );
}

export default VideoModal;
