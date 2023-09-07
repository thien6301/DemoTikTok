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
    Embed,
    SendtoFriend,
    ShareIconMini,
    SharetoFacebook,
    SharetoWatchsApp,
    TwitterIcon,
} from '~/components/Icons';
import VideoCmtItems from './VideoCmtItems';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
function ViewVideoItems({ data }) {
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('video')}>
                <img
                    src="https://bazaarvietnam.vn/wp-content/uploads/2023/08/jisoo-blackpink-tai-xuat-voi-phim-zombie-cua-bien-kich-parasite-thum.jpg"
                    className={cx('test')}
                />
            </div>
            <div className={cx('content')}>
                <div className={cx('description-container')}>
                    <div className={cx('info-container')}>
                        <Image
                            src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/f5ea0cea4a605d4f141f92c2bbb840f4.jpeg?x-expires=1694142000&x-signature=wkCy4lQQ4AhDDbndNNVt1N7TS3w%3D"
                            className={cx('avatar')}
                        />
                        <div className={cx('name')}>
                            <h2 className={cx('nickname')}>dqamii</h2>
                            <h4 className={cx('fullname')}>
                                Quỳnh ami
                                <span style={{ margin: '0px 4px ' }}>.</span>
                                <span>8-20</span>
                            </h4>
                        </div>
                        <div className={cx('follow')}>
                            <Button primary>Follow</Button>
                        </div>
                    </div>
                    <div className={cx('main-container')}>
                        <div className={cx('title-content')}>
                            <h1 className={cx('title')}>a đâu rồi ????</h1>

                            <span className={cx('hastag')}>#DQami</span>
                        </div>

                        <div className={cx('brower-music')}>
                            <span className={cx('icon-music')}>
                                <FontAwesomeIcon icon={faMusic} />
                            </span>
                            <p className={cx('title-music')}>
                                nhạc nền - Bảo Trâm
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
                                <strong className={cx('count')}>4226</strong>
                            </div>
                            <div className={cx('cmt')}>
                                <div className={cx('spanIcon')}>
                                    <CmtIcon />
                                </div>
                                <strong className={cx('count')}>17</strong>
                            </div>
                            <div className={cx('favorite')}>
                                <div className={cx('spanIcon')}>
                                    <FontAwesomeIcon icon={faBookmark} />
                                </div>
                                <strong className={cx('count')}>56</strong>
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
                    <div className={cx('footer-container')}>
                        <div className={cx('creat-cmt')}>
                            <input
                                type='text'
                                placeholder="Add comment..."
                            />
                            <div className={cx('emojis')}>
                                <FontAwesomeIcon icon={faFaceSmile} className={cx('icon')} />
                            </div>
                        </div>
                        <div className={cx('post-cmt')}>Post</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewVideoItems;
