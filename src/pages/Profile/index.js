import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '~/components/Image/Image';
import Button from '~/components/Button';
import { faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as getUserService from '~/services/getUserService';

import {
    LockIcon,
    MoreIcon,
    ShareIcon,
    ShareIconDefault,
} from '~/components/Icons';
import { useEffect, useState } from 'react';
// import { Unfollow } from '~/components/Icons';

const cx = classNames.bind(styles);
function Profile() {
    const [isUser, setIsUser] = useState([]);

    useEffect(() => {
        fetch(
            `https://tiktok.fullstack.edu.vn/api/users${window.location.pathname}`,
        )
            .then((res) => res.json())
            .then((res) => {
                setIsUser(res.data);
            });
        // .catch((error) => {
        //     console.log(error);
        // });
    }, []);

    console.log(isUser);

    return (
        <>
                <ProfileTest  />
        </>
    );
}

const ProfileTest = () => {
    const [isActiveVideo, setIsActiveVideo] = useState(true);
    const [isActiveLike, setIsActiveLike] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleClickVideo = () => {
        setIsActiveVideo(true);
        setIsActiveLike(false);
        setIsActive(false);
    };

    const handleClickLike = () => {
        setIsActiveVideo(false);
        setIsActiveLike(true);
        setIsActive(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('profile-container')}>
                    <div className={cx('profile-info')}>
                        <Image
                            className={cx('avatar')}
                            src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/f5ea0cea4a605d4f141f92c2bbb840f4.jpeg?x-expires=1693018800&x-signature=reUmO2ZN%2BNpMxT63jnqWnWdJke4%3D"
                        />
                        <div className={cx('title-info')}>
                            <h1 className={cx('nick-name')}>
                                hahongnhung01
                                {/* <FontAwesomeIcon
                                    className={cx('check')}
                                    icon={faCheckCircle}
                                /> */}
                            </h1>
                            <h2 className={cx('full-name')}>Dung Souciu</h2>
                            <div className={cx('follow-container')}>
                                <Button primary className={cx('follow-btn')}>
                                    Follow
                                </Button>
                                {/* <Button outline>Message</Button>
                                    <div className={cx('action-unfollow')}>
                                        <Unfollow />
                                    </div> */}
                            </div>
                        </div>
                    </div>
                    <h3 className={cx('count-info')}>
                        <div className={cx('count')}>
                            <strong title="following">1684</strong>
                            <span>Following</span>
                        </div>
                        <div className={cx('count')}>
                            <strong title="follower">372.7K</strong>
                            <span>Followers</span>
                        </div>
                        <div className={cx('count')}>
                            <strong title="like">4.3M</strong>
                            <span>Likes</span>
                        </div>
                    </h3>
                    <h2 className={cx('user-bio')}>Fb: Hà Hồng Dung</h2>
                    <a className={cx('profile-link')}>
                        amiamii.passio.eco/home
                    </a>
                    <div className={cx('more-btn')}>
                        <div className={cx('share')}>
                            {' '}
                            <ShareIconDefault />{' '}
                        </div>
                        <div className={cx('more')}>
                            {' '}
                            <MoreIcon />{' '}
                        </div>
                    </div>
                </div>

                <div className={cx('profile-main')}>
                    <div className={cx('profile-tablist')}>
                        <div
                            className={cx(
                                'tab-item',
                                isActiveVideo ? 'active' : '',
                            )}
                            onClick={handleClickVideo}
                        >
                            Videos
                        </div>
                        <div
                            className={cx(
                                'tab-item',
                                isActiveLike ? 'active' : '',
                            )}
                            onClick={handleClickLike}
                        >
                            <FontAwesomeIcon
                                icon={faLock}
                                className={cx('lock-btn')}
                            />
                            Liked
                        </div>
                        <div
                            className={cx(
                                'tab-line',
                                isActive ? 'active-line' : '',
                            )}
                        ></div>
                    </div>
                    <div className={cx('profile-videolist')}>
                        {isActiveVideo ? (
                            <div className={cx('cover')}>
                                <div className={cx('videolist-container')}>
                                    <div className={cx('videos')}>
                                        <Image
                                            className={cx('thumb-video')}
                                            src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/3ba6d06a42224543900f2c2983e06a75_1691928761~tplv-efzqqlc8t1-1:480:480.jpeg?x-expires=1692867600&x-signature=BB6f3IK%2Bp%2FoGsLzOU7rXRX5Bn58%3D"
                                        />
                                    </div>
                                    <p className={cx('title-video')}>
                                        Anh ở đâu rồi!!
                                    </p>
                                </div>
                                <div className={cx('videolist-container')}>
                                    <div className={cx('videos')}>
                                        <Image
                                            className={cx('thumb-video')}
                                            src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/3ba6d06a42224543900f2c2983e06a75_1691928761~tplv-efzqqlc8t1-1:480:480.jpeg?x-expires=1692867600&x-signature=BB6f3IK%2Bp%2FoGsLzOU7rXRX5Bn58%3D"
                                        />
                                    </div>
                                    <p className={cx('title-video')}>
                                        Anh ở đâu rồi!!
                                    </p>
                                </div>
                                <div className={cx('videolist-container')}>
                                    <div className={cx('videos')}>
                                        <Image
                                            className={cx('thumb-video')}
                                            src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/3ba6d06a42224543900f2c2983e06a75_1691928761~tplv-efzqqlc8t1-1:480:480.jpeg?x-expires=1692867600&x-signature=BB6f3IK%2Bp%2FoGsLzOU7rXRX5Bn58%3D"
                                        />
                                    </div>
                                    <p className={cx('title-video')}>
                                        Anh ở đâu rồi!!
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('liked')}>
                                <div className={cx('like-lock-icon')}>
                                    <LockIcon />
                                </div>
                                <p className={cx('like-title')}>
                                    This user's liked videos are private
                                </p>
                                <p className={cx('like-desc')}>
                                    Videos liked by hahongdung01 are currently
                                    hidden
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
