import classNames from 'classnames/bind';
import style from './followingDefault.module.scss';
import FollowingItems from './followingItems';
const cx = classNames.bind(style);

function FollowingDefault({ data = [] }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-poster')}>
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
                <FollowingItems />
            </div>
            
        </div>
    );
}

export default FollowingDefault;
