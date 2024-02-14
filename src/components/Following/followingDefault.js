import classNames from 'classnames/bind';
import style from './followingDefault.module.scss';
import FollowingItems from './followingItems';
const cx = classNames.bind(style);

function FollowingDefault({ user = [] }) {
    console.log(user);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-poster')}>
                {user.map((account) => (
                    <FollowingItems key={account.id} user={account} />
                ))}
            </div>
        </div>
    );
}

export default FollowingDefault;
