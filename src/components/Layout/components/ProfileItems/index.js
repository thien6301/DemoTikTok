import classNames from 'classnames/bind';
import styles from './ProfileItems.module.scss';
import Tippy from '@tippyjs/react';

import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image/Image';
import Button from '~/components/Button';
import {
    BlockIcon,
    ContentIcon,
    LockDefaultIcon,
    LockIcon,
    MoreIcon,
    ReportIcon,
    ShareDefault,
    UnFollow,
} from '~/components/Icons';
import { useState } from 'react';

const cx = classNames.bind(styles);

const userMenu = [
    {
        icon: <ReportIcon />,
        title: 'Report',
        to: '/@thien632001',
    },

    {
        icon: <BlockIcon />,
        title: 'Block',
        separate: true,
    },
];

function ProfileItems({ data, result }) {
    const [activeVideo, setActiveVideo] = useState(true);
    const [activeLiked, setActiveLiked] = useState(false);
    const [activeLine, setActiveLine] = useState(false);

    const handleActiveVideos = () => {
        setActiveVideo(true);
        setActiveLiked(false);
        setActiveLine(false);
    };
    const handleActiveLiked = () => {
        setActiveVideo(false);
        setActiveLiked(true);
        setActiveLine(true);
    };

    const VideosItems = ({ result }) => {
        return (
            <div className={cx('profile-videolist')}>
                <div className={cx('videos')}>
                    <Image
                        className={cx('thumb-video')}
                        src={result.thumb_url}
                    />
                    <p className={cx('title-video')}>{result.description}</p>
                </div>
            </div>
        );
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('profile-container')}>
                    <div className={cx('profile-info')}>
                        <Image className={cx('avatar')} src={data.avatar} />
                        <div className={cx('title-info')}>
                            <h1 className={cx('nick-name')}>{data.nickname}</h1>
                            {/* <FontAwesomeIcon icon={}/> */}
                            <h2 className={cx('full-name')}>
                                {data.first_name + ' ' + data.last_name}
                            </h2>
                            <div className={cx('message-container')}>
                                <Button outline className={cx('message')}>
                                    Message
                                </Button>
                                <Tippy content="Unfollow" placement="bottom">
                                    <div className={cx('unfollow')}>
                                        <UnFollow />
                                    </div>
                                </Tippy>
                            </div>
                            {/* <Button primary className={cx('follow-btn')}>
                                Follow
                            </Button> */}
                        </div>
                    </div>
                    <h3 className={cx('count-info')}>
                        <div className={cx('count')}>
                            <strong>{data.followings_count}</strong>
                            <span>Following</span>
                        </div>
                        <div className={cx('count')}>
                            <strong>{data.followers_count}</strong>
                            <span>Followers</span>
                        </div>
                        <div className={cx('count')}>
                            <strong>{data.likes_count}</strong>
                            <span>Likes</span>
                        </div>
                    </h3>
                    <h2 className={cx('user-bio')}>{data.bio}</h2>
                    <div className={cx('profile-link')}>
                        amiamii.passio.eco/home
                    </div>

                    <div className={cx('more-btn')}>
                        <span className={cx('share')}>
                            <ShareDefault />
                        </span>
                        <Menu items={userMenu} className = {cx('menu-list')}>
                            <span>
                                <MoreIcon />
                            </span>
                        </Menu>
                    </div>
                </div>

                <div>
                    <div className={cx('profile-tablist')}>
                        <div
                            className={cx(
                                'tab-item',
                                activeVideo ? 'active' : '',
                            )}
                            onClick={handleActiveVideos}
                        >
                            Videos
                        </div>
                        <div
                            className={cx(
                                'tab-item',
                                activeLiked ? 'active' : '',
                            )}
                            onClick={handleActiveLiked}
                        >
                            <span className={cx('lock-btn')}>
                                <LockIcon />
                            </span>
                            <span>Likes</span>
                        </div>
                        <div
                            className={cx(
                                'tab-line',
                                activeLine ? 'active-line' : '',
                            )}
                        ></div>
                    </div>

                    {activeVideo && result.length > 0 ? (
                        <div className={cx('cover')}>
                            {result.map((account) => (
                                <VideosItems
                                    key={account.id}
                                    result={account}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className={cx('default-videos')}>
                            <span className={cx('icon')}>
                                <ContentIcon />
                            </span>
                            <p className={cx('title')}>No content</p>
                            <p className={cx('defaultvideos-desc')}>
                                This user has not published any videos.
                            </p>
                        </div>
                    )}

                    {activeLiked && (
                        <div className={cx('liked')}>
                            <span className={cx('icon')}>
                                <LockDefaultIcon />
                            </span>
                            <p className={cx('title')}>
                                This user's liked videos are private
                            </p>
                            <p className={cx('desc')}>
                                Videos liked by str1407 are currently hidden
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfileItems;
