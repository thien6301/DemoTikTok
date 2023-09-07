import classNames from 'classnames/bind';
import style from './followingDefault.module.scss';
import Image from '../Image/Image';
import Button from '../Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);
function FollowingItems({ user }) {
    return (
        <Link to={`/@${user.nickname}`} target="_blank">
            <div className={cx('video-preview')}>
                <Image
                    className={cx('img-poster')}
                    src={user.popular_video.thumb_url}
                />
            </div>
            <div className={cx('info-container')}>
                <Image className={cx('avatar')} src={user.avatar} />
                <h3 className={cx('full-name')}>
                    {user.first_name + ' ' + user.last_name}
                </h3>
                <h4 className={cx('nick-name')}>{user.nickname}</h4>
                <Button primary> Follow </Button>
            </div>
        </Link>
    );
}

export default FollowingItems;
